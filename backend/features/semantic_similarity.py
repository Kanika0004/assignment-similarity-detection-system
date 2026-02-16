from sentence_transformers import SentenceTransformer, util
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")


def chunk_text(text, chunk_size=400):
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)

    return chunks


def get_document_embedding(text):
    chunks = chunk_text(text)

    chunk_embeddings = model.encode(
        chunks,
        convert_to_tensor=True,
        batch_size=8
    )

    return chunk_embeddings.mean(dim=0)


def semantic_similarity(texts):
    doc_embeddings = []

    for text in texts:
        emb = get_document_embedding(text)
        doc_embeddings.append(emb)

    doc_embeddings = np.stack([emb.cpu().numpy() for emb in doc_embeddings])

    similarity_matrix = np.matmul(doc_embeddings, doc_embeddings.T)

    return similarity_matrix
