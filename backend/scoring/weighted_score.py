import numpy as np
from ..core.config import SIMILARITY_WEIGHTS
from ..features.content_similarity import content_similarity
from ..features.semantic_similarity import semantic_similarity
from ..features.structure_similarity import structure_similarity
from ..features.stylometry_similarity import stylometry_similarity
from ..features.metadata_similarity import metadata_similarity


def compute_weighted_similarity(texts, metadata):
    content_sim = content_similarity(texts)
    semantic_sim = semantic_similarity(texts)
    structure_sim = structure_similarity(texts)
    stylometry_sim = stylometry_similarity(texts)
    metadata_sim = metadata_similarity(metadata)

    weights = SIMILARITY_WEIGHTS

    final_matrix = (
        content_sim * weights["content"] +
        semantic_sim * weights["semantic"] +
        structure_sim * weights["structure"] +
        stylometry_sim * weights["stylometry"] +
        metadata_sim * weights["metadata"]
    )

    return final_matrix
