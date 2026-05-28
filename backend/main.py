from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import analyzer, property

app = FastAPI(title="AI Legal Document Analyzer API")

# Configure CORS
origins = [
    "http://localhost:5173", # Vite dev server
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyzer.router, prefix="/api/analyze", tags=["Analyze"])
app.include_router(property.router, prefix="/api/verify-property", tags=["Verify Property"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Legal Document Analyzer API"}
