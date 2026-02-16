import numpy as np
import re

def extract_structure(text):
    sentences = re.split(r'[.!?]', text)
    return len(sentences), text.count("\n")

def structure_similarity(texts):
    features = [extract_structure(t) for t in texts]
    n = len(features)
    sim = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            s1, p1 = features[i]
            s2, p2 = features[j]

            sent_sim = 1 - abs(s1 - s2) / max(s1, s2, 1)
            para_sim = 1 - abs(p1 - p2) / max(p1, p2, 1)

            sim[i][j] = (sent_sim * 0.6 + para_sim * 0.4)

    return sim
