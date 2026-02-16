import numpy as np
import re
from collections import Counter

FUNCTION_WORDS = [
    "the","is","in","at","of","a","and","to","it","that","this","on","for",
    "with","as","was","were","be","by","are","an","or","from","but","if",
    "then","than","so","because","while","although"
]


def extract_stylometric_vector(text):
    words = re.findall(r'\w+', text.lower())
    total_words = len(words)

    if total_words == 0:
        return np.zeros(len(FUNCTION_WORDS) + 4)

    word_counts = Counter(words)

    # Function word frequency vector
    function_vector = [
        word_counts[w] / total_words for w in FUNCTION_WORDS
    ]

    # Additional stylistic features
    avg_word_length = np.mean([len(w) for w in words])
    type_token_ratio = len(set(words)) / total_words
    punctuation_ratio = len(re.findall(r'[^\w\s]', text)) / len(text)
    long_word_ratio = sum(1 for w in words if len(w) > 6) / total_words

    return np.array(function_vector + [
        avg_word_length,
        type_token_ratio,
        punctuation_ratio,
        long_word_ratio
    ])


def stylometry_similarity(texts):
    vectors = np.array([extract_stylometric_vector(t) for t in texts])

    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    norms[norms == 0] = 1
    vectors = vectors / norms

    similarity = vectors @ vectors.T
    return similarity
