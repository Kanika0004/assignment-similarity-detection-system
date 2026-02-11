from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

def semantic_similarity(texts):
    embeddings = model.encode(texts, convert_to_tensor=True)
    return util.cos_sim(embeddings, embeddings).cpu().numpy()
