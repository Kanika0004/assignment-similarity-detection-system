import numpy as np
import re


def get_sentence_lengths(text):
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    return [len(re.findall(r'\w+', s)) for s in sentences]


def pad_sequence(seq, max_len):
    if len(seq) == 0:
        return np.zeros(max_len)
    padded = seq + [0] * (max_len - len(seq))
    return np.array(padded[:max_len])


def structure_similarity(texts):
    sentence_sequences = [get_sentence_lengths(t) for t in texts]

    max_len = max(len(seq) for seq in sentence_sequences)
    max_len = max(max_len, 1)

    vectors = np.array([pad_sequence(seq, max_len) for seq in sentence_sequences])

    # Normalize each vector
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    norms[norms == 0] = 1
    vectors = vectors / norms

    similarity = vectors @ vectors.T
    return similarity
