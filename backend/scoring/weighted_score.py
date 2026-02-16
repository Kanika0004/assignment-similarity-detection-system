import numpy as np
from ..core.config import SIMILARITY_WEIGHTS

from ..features.content_similarity import content_similarity
from ..features.semantic_similarity import semantic_similarity
from ..features.structure_similarity import structure_similarity
from ..features.stylometry_similarity import stylometry_similarity
from ..features.metadata_similarity import metadata_similarity


def compute_weighted_similarity(texts, metadata, filenames):

    n = len(texts)

    # 1️⃣ Compute all similarity matrices
    content_sim = content_similarity(texts)
    semantic_sim = semantic_similarity(texts)
    structure_sim = structure_similarity(texts)
    stylometry_sim = stylometry_similarity(texts)
    metadata_sim = metadata_similarity(metadata, filenames)

    # 2️⃣ Ensure all matrices are square and same size
    def ensure_square(mat):
        mat = np.array(mat)
        if mat.shape != (n, n):
            fixed = np.zeros((n, n), dtype=float)
            for i in range(min(n, mat.shape[0])):
                for j in range(min(n, mat.shape[1])):
                    fixed[i][j] = mat[i][j]
            return fixed
        return mat

    content_sim = ensure_square(content_sim)
    semantic_sim = ensure_square(semantic_sim)
    structure_sim = ensure_square(structure_sim)
    stylometry_sim = ensure_square(stylometry_sim)
    metadata_sim = ensure_square(metadata_sim)

    # 3️⃣ Load weights
    weights = SIMILARITY_WEIGHTS

    # 4️⃣ Weighted combination
    final_matrix = (
        content_sim * weights["content"]
        + semantic_sim * weights["semantic"]
        + structure_sim * weights["structure"]
        + stylometry_sim * weights["stylometry"]
        + metadata_sim * weights["metadata"]
    )

    # 5️⃣ Clip safety
    final_matrix = np.clip(final_matrix, 0, 1)

    # 6️⃣ Validation
    assert np.allclose(final_matrix, final_matrix.T), "Matrix not symmetric"
    assert np.all(np.diag(final_matrix) >= 0.95), "Diagonal values incorrect"

    breakdown = {
        "content": content_sim,
        "semantic": semantic_sim,
        "structure": structure_sim,
        "stylometry": stylometry_sim,
        "metadata": metadata_sim,
    }

    return final_matrix, breakdown
