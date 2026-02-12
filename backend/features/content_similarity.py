from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ✅ Create once
vectorizer = TfidfVectorizer(stop_words="english")


def content_similarity(texts):
    tfidf = vectorizer.fit_transform(texts)
    similarity_matrix = cosine_similarity(tfidf)

    return similarity_matrix
