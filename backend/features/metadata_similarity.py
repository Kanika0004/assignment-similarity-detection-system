import numpy as np


def metadata_similarity(metadata_dict, filenames):
    n = len(filenames)
    sim = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            m1 = metadata_dict[filenames[i]]
            m2 = metadata_dict[filenames[j]]

            size_sim = 1 - abs(m1["size"] - m2["size"]) / max(m1["size"], m2["size"], 1)
            word_sim = 1 - abs(m1["word_count"] - m2["word_count"]) / max(m1["word_count"], m2["word_count"], 1)

            sim[i][j] = (size_sim * 0.5 + word_sim * 0.5)

    return sim
