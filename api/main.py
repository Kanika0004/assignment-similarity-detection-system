from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pdfplumber
import pytesseract
from PIL import Image
import io
import numpy as np
from typing import List

# ---------------------------------
# FastAPI App
# ---------------------------------
app = FastAPI(
    title="Assignment Similarity Detection API",
    description="AI-powered system to detect similarity between assignments using OCR + Semantic AI.",
    version="3.0.0"
)

# ---------------------------------
# CORS (Frontend Access)
# ---------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------
# Load AI Model Once
# ---------------------------------
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# ---------------------------------
# OCR + PDF Text Extraction
# ---------------------------------
def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""

    try:
        # 1️⃣ Try normal PDF text
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        # 2️⃣ OCR fallback (scanned PDFs)
        if not text.strip():
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                for page in pdf.pages:
                    image = page.to_image(resolution=300).original
                    text += pytesseract.image_to_string(
                        image,
                        lang="eng",
                        config="--oem 3 --psm 11 -c preserve_interword_spaces=1"
                    )


    except Exception:
        return ""

    return text.strip()

# ---------------------------------
# Root Endpoint
# ---------------------------------
@app.get("/")
def root():
    return {"status": "Backend running 🚀"}

# ---------------------------------
# Health Check
# ---------------------------------
@app.get("/health")
def health():
    return {"model_loaded": True}

# ---------------------------------
# Compare Assignments
# ---------------------------------
@app.post("/compare")
async def compare_assignments(
    files: List[UploadFile] = File(...)
):
    if len(files) < 2:
        raise HTTPException(
            status_code=400,
            detail="Upload at least 2 assignments."
        )

    texts = []
    filenames = []

    for file in files:
        content = await file.read()
        text = extract_text_from_pdf(content)

        # Handle handwritten / unreadable
        if not text or len(text.strip()) < 10:
            texts.append("[UNREADABLE_CONTENT]")
        else:
            texts.append(text)

        filenames.append(file.filename)

    # If handwritten detected
    if "[UNREADABLE_CONTENT]" in texts:
        return JSONResponse(
            status_code=200,
            content={
                "warning": "Handwritten or unreadable assignment detected.",
                "message": "OCR cannot reliably analyze handwritten text.",
                "comparisons": []
            }
        )

    # Generate embeddings
    embeddings = model.encode(texts)

    # Similarity matrix
    similarity_matrix = cosine_similarity(embeddings)

    results = []

    for i in range(len(files)):
        for j in range(i + 1, len(files)):
            score = float(similarity_matrix[i][j])  # FIX numpy.float32
            percentage = round(score * 100, 2)

            results.append({
                "file1": filenames[i],
                "file2": filenames[j],
                "similarity": percentage,
                "interpretation": interpret_score(percentage)
            })

    return JSONResponse(content={"comparisons": results})

# ---------------------------------
# Score Interpretation
# ---------------------------------
def interpret_score(score: float) -> str:
    if score >= 85:
        return "Highly Similar ⚠️"
    elif score >= 60:
        return "Moderately Similar"
    elif score >= 30:
        return "Low Similarity"
    else:
        return "Very Different"
