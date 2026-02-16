from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.ingestion.docx_reader import read_document
from backend.scoring.weighted_score import compute_weighted_similarity
from backend.core.database import SessionLocal, SimilarityResult


app = FastAPI(
    title="Assignment Similarity Detection API",
    version="4.2.0"
)

# ✅ FIXED CORS (very important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Health check endpoint
@app.get("/")
def root():
    return {"status": "Backend running 🚀"}


# ✅ Compare API
@app.post("/compare")
async def compare_assignments(files: List[UploadFile] = File(...)):

    if len(files) < 2:
        raise HTTPException(status_code=400, detail="Upload at least 2 files")

    texts = []
    filenames = []
    metadata = {}

    # -------- READ FILES --------
    for file in files:
        try:
            content = await file.read()
            text = read_document(file.filename, content)

            if not text or len(text.strip()) < 20:
                raise ValueError("Unreadable or too short")

            texts.append(text)
            filenames.append(file.filename)

            metadata[file.filename] = {
                "size": len(content),
                "word_count": len(text.split())
            }

        except Exception:
            raise HTTPException(
                status_code=400,
                detail=f"Unreadable document: {file.filename}"
            )

    # -------- COMPUTE SIMILARITY --------
    try:
        similarity_matrix, breakdown = compute_weighted_similarity(texts, metadata, filenames)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Similarity error: {str(e)}")

    db = SessionLocal()
    results = []

    try:
        for i in range(len(files)):
            for j in range(i + 1, len(files)):

                score = float(similarity_matrix[i][j])
                percentage = round(score * 100, 2)
                risk = interpret_score(percentage)

                db_result = SimilarityResult(
                    file1=filenames[i],
                    file2=filenames[j],
                    score=percentage,
                    risk=risk
                )
                db.add(db_result)

                results.append({
                    "file1": filenames[i],
                    "file2": filenames[j],
                    "similarity": percentage,
                    "risk": risk,
                    "breakdown": {
                        "content": round(float(breakdown["content"][i][j]) * 100, 2),
                        "semantic": round(float(breakdown["semantic"][i][j]) * 100, 2),
                        "structure": round(float(breakdown["structure"][i][j]) * 100, 2),
                        "stylometry": round(float(breakdown["stylometry"][i][j]) * 100, 2),
                        "metadata": round(float(breakdown["metadata"][i][j]) * 100, 2),
                    }
                })

        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    finally:
        db.close()

    return JSONResponse(content={"comparisons": results})


# ✅ Risk interpretation
def interpret_score(score: float) -> str:
    if score >= 85:
        return "High Risk ⚠️"
    elif score >= 60:
        return "Moderate Risk"
    elif score >= 30:
        return "Low Risk"
    else:
        return "Very Low Risk"
