from core.config import SIMILARITY_WEIGHTS

def calculate_score(meta, content, semantic, structure, style):
    return (
        SIMILARITY_WEIGHTS["metadata"] * meta +
        SIMILARITY_WEIGHTS["content"] * content +
        SIMILARITY_WEIGHTS["semantic"] * semantic +
        SIMILARITY_WEIGHTS["structure"] * structure +
        SIMILARITY_WEIGHTS["stylometry"] * style
    )

def risk(score):
    if score < 0.4:
        return "Low"
    elif score < 0.65:
        return "Moderate"
    elif score < 0.8:
        return "High"
    else:
        return "Very High"
