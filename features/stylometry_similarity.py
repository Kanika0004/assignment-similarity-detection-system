import numpy as np

def vocab_ratio(text):
    words = text.split()
    return len(set(words)) / len(words) if words else 0

def stylometry_similarity(texts):
    ratios = [vocab_ratio(t) for t in texts]
    n = len(ratios)
    sim = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            sim[i][j] = 1 - abs(ratios[i] - ratios[j])

    return sim
