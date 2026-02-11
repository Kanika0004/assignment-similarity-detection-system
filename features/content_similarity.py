from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def content_similarity(texts):
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform(texts)
    return cosine_similarity(tfidf)
