# AI Legal Document Analyzer

An AI-powered multilingual legal-tech platform designed to analyze legal agreements, detect risky clauses, and simulate property ownership verification. This project focuses on solving real-world problems related to legal document understanding, hidden agreement conditions, and property fraud detection in India.

---

# 📌 Project Motivation

While searching for property for my family, I came across several issues related to agreement disputes, hidden clauses, unclear legal language, and frauds in property verification. Many people struggle to understand legal agreements, especially when documents are written in different languages or contain complex legal terms.

This project was developed to create a smart and user-friendly AI-based solution that helps users:

* Understand legal agreements easily
* Detect risky or unfair clauses
* Verify property ownership information
* Support multilingual legal documents used across India

---

# 🚀 Features

## 🔹 Agreement Analyzer

AI-powered agreement analysis system capable of:

* Uploading legal documents
* Detecting risky clauses
* Identifying hidden conditions
* Detecting unfair or one-sided terms
* Highlighting legal threats
* Performing spell checking
* Summarizing agreements
* Supporting multilingual legal documents

### Supported File Formats

* PDF
* DOCX
* TXT
* Scanned Images

---

## 🔹 Multilingual Processing

Supports:

* English
* Hindi
* Regional Indian Languages (basic support)

### Processing Pipeline

1. Document Upload
2. OCR Processing
3. Language Detection
4. Translation to English
5. AI Analysis
6. Risk Classification
7. Report Generation
8. Optional Translation Back

---

## 🔹 OCR Integration

Uses OCR to extract text from:

* Scanned agreements
* Image-based documents

---

## 🔹 Property Verification System

Simulates property ownership verification using a dataset.

### Inputs

* Property ID
* Registration Number
* Seller Name

### Outputs

* Verified
* Suspicious
* Owner Name
* Matching Results

---

## 🔹 AI Risk Detection

The system detects:

* Penalty Clauses
* Indemnity Risks
* Liability Clauses
* Hidden Conditions
* Ambiguous Legal Language
* One-Sided Agreements

### Severity Levels

* High
* Medium
* Low

---

# 🛠️ Tech Stack

## Frontend

* React.js
* TypeScript
* Tailwind CSS

## Backend

* FastAPI
* Python

## AI & NLP

* OpenAI API
* Language Detection
* Translation APIs

## OCR

* Tesseract OCR

## Database

* SQLite / PostgreSQL

## Deployment

* Docker
* Replit
* Streamlit Cloud
* AWS / Render (Future Scope)

---

# 📂 Project Structure

```bash
AI-Legal-Document-Analyzer/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.tsx
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── main.py
│   └── requirements.txt
│
├── datasets/
│   └── property_records.csv
│
├── ocr_module/
├── translation_module/
├── ai_module/
│
├── docker/
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/kartikbhatt2808/Legal_Document_Analyser.git
```

```bash
cd Legal_Document_Analyser
```

---

# 🔹 Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔹 Backend Setup

## Create Virtual Environment

```bash
python -m venv .venv
```

## Activate Environment

### Windows

```bash
.venv\Scripts\activate
```

### Linux/Mac

```bash
source .venv/bin/activate
```

---

## Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# 🔑 Environment Variables

Create a `.env` file inside backend:

```env
OPENAI_API_KEY=YOUR_API_KEY
```

---

# 🧠 AI Workflow

## Agreement Analyzer Flow

```text
Upload Document
      ↓
OCR Processing
      ↓
Language Detection
      ↓
Translation to English
      ↓
AI Legal Analysis
      ↓
Risk Detection
      ↓
Summary Generation
      ↓
Multilingual Output
```

---

# 📊 Sample Output

## Agreement Summary

* Agreement Type
* Parties Involved
* Key Conditions

## Risk Analysis

| Clause           | Severity | Description                  |
| ---------------- | -------- | ---------------------------- |
| Penalty Clause   | High     | Excessive daily penalty      |
| Termination      | Medium   | One-sided termination rights |
| Security Deposit | Low      | Non-refundable condition     |

---

# 🔒 Security Features

* Secure file handling
* Environment variable protection
* API key isolation
* Modular backend architecture

---

# 🌍 Future Enhancements

* Real Government API Integration
* Voice-based Legal Assistant
* Regional Language Expansion
* AI Chatbot for Legal Queries
* Clause Highlighting on Original PDF
* Downloadable AI Reports
* Cloud Deployment

---

# 🎯 Learning Outcomes

This project helped in understanding:

* AI integration in real-world applications
* Full-stack development
* OCR systems
* Multilingual NLP pipelines
* FastAPI backend development
* React frontend architecture
* Legal-tech problem solving

---

# 👨‍💻 Author

## Kartik Bhatt

B.Tech CSE (Cloud Computing)

Interested in:

* AI Applications
* Cloud Computing
* Full Stack Development
* Legal-Tech Solutions
* Multilingual AI Systems

---

# ⭐ Project Status

✅ Frontend Prototype Completed
✅ UI/UX Developed
✅ Multilingual Workflow Designed
✅ Property Verification Logic Implemented
🚧 AI & OCR Integration In Progress
🚧 Backend API Expansion In Progress

---

# 📜 License

This project is developed for educational and research purposes.
