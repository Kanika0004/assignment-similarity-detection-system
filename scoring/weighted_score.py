from core.config import SIMILARITY_WEIGHTS


def calculate_score(meta, content, semantic, structure, style):
    final_score = (
        SIMILARITY_WEIGHTS["metadata"] * meta +
        SIMILARITY_WEIGHTS["content"] * content +
        SIMILARITY_WEIGHTS["semantic"] * semantic +
        SIMILARITY_WEIGHTS["structure"] * structure +
        SIMILARITY_WEIGHTS["stylometry"] * style
    )

    return round(final_score, 4)


def risk(score):
    if score < 0.4:
        return "Low"
    elif score < 0.65:
        return "Moderate"
    elif score < 0.8:
        return "High"
    else:
        return "Very High"


def build_response(meta, content, semantic, structure, style):
    final_score = calculate_score(meta, content, semantic, structure, style)

    return {
        "metadata_score": meta,
        "content_score": content,
        "semantic_score": semantic,
        "structure_score": structure,
        "stylometry_score": style,
        "final_score": final_score,
        "risk_level": risk(final_score)
    }
