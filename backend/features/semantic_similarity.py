from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")


def chunk_text(text, chunk_size=400):
    words = text.split()
    return [
        " ".join(words[i:i + chunk_size])
        for i in range(0, len(words), chunk_size)
    ]


def get_document_embedding(text):
    chunks = chunk_text(text)

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True,
        batch_size=8,
        normalize_embeddings=True  # IMPORTANT
    )

    return np.mean(embeddings, axis=0)


def semantic_similarity(texts):
    doc_embeddings = np.array([
        get_document_embedding(text)
        for text in texts
    ])

    similarity_matrix = cosine_similarity(doc_embeddings)

    # Clamp to [0,1] safety
    similarity_matrix = np.clip(similarity_matrix, 0, 1)

    return similarity_matrix
