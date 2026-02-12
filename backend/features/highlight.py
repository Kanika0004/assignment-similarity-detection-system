from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk

nltk.download("punkt")

def highlight_similar_sentences(text1, text2, threshold=0.8):
    s1 = nltk.sent_tokenize(text1)
    s2 = nltk.sent_tokenize(text2)

    vectorizer = TfidfVectorizer().fit(s1 + s2)
    tfidf1 = vectorizer.transform(s1)
    tfidf2 = vectorizer.transform(s2)

    copied = []
    for i, sentence in enumerate(s1):
        sims = cosine_similarity(tfidf1[i], tfidf2)[0]
        if max(sims) >= threshold:
            copied.append(sentence)

    return copied
