import os
import json
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Optional
from dotenv import load_dotenv
import PyPDF2
from langdetect import detect
from deep_translator import GoogleTranslator
from openai import AsyncOpenAI

load_dotenv()
router = APIRouter()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/")
async def analyze_document(file: UploadFile = File(...)):
    """
    Endpoint to receive legal documents for AI analysis.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Read file content
    content = await file.read()
    
    extracted_text = ""
    if file.filename.lower().endswith(".pdf"):
        # Process PDF using PyPDF2
        try:
            from io import BytesIO
            pdf_reader = PyPDF2.PdfReader(BytesIO(content))
            for page in pdf_reader.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to read PDF: {str(e)}")
    else:
        # Assume it's a text file
        try:
            extracted_text = content.decode("utf-8")
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="Unsupported file format or encoding.")

    if not extracted_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from the document.")

    # Truncate text if it's too long (rough approximation for token limits)
    extracted_text = extracted_text[:20000]

    # Detect language
    try:
        lang = detect(extracted_text)
    except:
        lang = "en"

    # Translate if not English
    processed_text = extracted_text
    if lang != "en":
        try:
            # GoogleTranslator has a 5000 character limit per request, so chunking might be needed
            # For simplicity in this demo, we'll translate the first 4999 chars
            translator = GoogleTranslator(source='auto', target='en')
            processed_text = translator.translate(extracted_text[:4999])
        except Exception as e:
            print("Translation error:", e)

    # Prompt OpenAI
    prompt = f"""
    You are an expert AI legal document analyzer. Analyze the following legal document text.
    Return a JSON response with the following exact structure:
    {{
        "summary": "A concise summary of the document",
        "risks": [
            {{
                "clause": "The exact clause or summary of the clause from the text",
                "severity": "High/Medium/Low",
                "explanation": "Why this is a risk"
            }}
        ],
        "warnings": [
            "Warning 1",
            "Warning 2"
        ]
    }}

    Document Text:
    {processed_text}
    """

    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            response_format={ "type": "json_object" },
            messages=[
                {"role": "system", "content": "You are a helpful legal assistant that strictly outputs JSON."},
                {"role": "user", "content": prompt}
            ]
        )
        ai_response = json.loads(response.choices[0].message.content)
        
        return {
            "status": "success",
            "filename": file.filename,
            "language_detected": lang,
            "summary": ai_response.get("summary", ""),
            "risks": ai_response.get("risks", []),
            "warnings": ai_response.get("warnings", []),
            "raw_text_preview": extracted_text[:500] + "..."
        }
    except Exception as e:
        print("OpenAI Error:", e)
        raise HTTPException(status_code=500, detail=f"AI Analysis failed: {str(e)}")
