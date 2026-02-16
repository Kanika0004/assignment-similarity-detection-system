import numpy as np
from ..core.config import SIMILARITY_WEIGHTS

from ..features.content_similarity import content_similarity
from ..features.semantic_similarity import semantic_similarity
from ..features.structure_similarity import structure_similarity
from ..features.stylometry_similarity import stylometry_similarity
from ..features.metadata_similarity import metadata_similarity


def compute_weighted_similarity(texts, metadata, filenames):

    # 1️⃣ Compute all similarity matrices

    content_sim = content_similarity(texts)
    semantic_sim = semantic_similarity(texts)
    structure_sim = structure_similarity(texts)
    stylometry_sim = stylometry_similarity(texts)

    # ✅ metadata needs filenames
    metadata_sim = metadata_similarity(metadata, filenames)


    # 2️⃣ Load weights
    weights = SIMILARITY_WEIGHTS


    # 3️⃣ Weighted combination

    final_matrix = (
        content_sim * weights["content"]
        + semantic_sim * weights["semantic"]
        + structure_sim * weights["structure"]
        + stylometry_sim * weights["stylometry"]
        + metadata_sim * weights["metadata"]
    )


    # 4️⃣ Clip safety

    final_matrix = np.clip(final_matrix, 0, 1)


    # 5️⃣ Validation

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
