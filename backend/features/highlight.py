from sentence_transformers import util
from backend.core.model import get_model
import nltk

try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt", quiet=True)


def split_sentences(text):
    return [s.strip() for s in nltk.sent_tokenize(text) if len(s.strip()) > 20]


def extract_matches(text1, text2, threshold=0.75):
    model = get_model()

    s1 = split_sentences(text1)
    s2 = split_sentences(text2)

    if not s1 or not s2:
        return []

    e1 = model.encode(s1, convert_to_tensor=True)
    e2 = model.encode(s2, convert_to_tensor=True)

    scores = util.cos_sim(e1, e2)

    matches = []
    for i in range(len(s1)):
        for j in range(len(s2)):
            score = float(scores[i][j])
            if score >= threshold:
                matches.append({
                    "left": s1[i],
                    "right": s2[j],
                    "similarity": round(score * 100, 2),
                    "type": "near-copy" if score >= 0.9 else "semantic"
                })

    return sorted(matches, key=lambda x: x["similarity"], reverse=True)[:20]
