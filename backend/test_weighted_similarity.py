import numpy as np
from datetime import datetime
from backend.scoring.weighted_score import compute_weighted_similarity


# ==========================================================
# Utility: Pretty Print Section
# ==========================================================
def print_section(title):
    print("\n" + "=" * 70)
    print(f"{title.center(70)}")
    print("=" * 70)


# ==========================================================
# Validation: Structural Checks
# ==========================================================
def validate_matrix(matrix):
    """
    Perform strict validation on similarity matrix.
    """

    assert isinstance(matrix, np.ndarray), "Matrix must be NumPy array!"
    assert matrix.shape[0] == matrix.shape[1], "Matrix must be square!"
    assert np.allclose(matrix, matrix.T), "Matrix must be symmetric!"
    assert np.all(np.diag(matrix) > 0.95), "Diagonal values must be near 1!"
    assert np.all((matrix >= 0) & (matrix <= 1)), "Values must be between 0 and 1!"

    return True


# ==========================================================
# Expectation Evaluation
# ==========================================================
def evaluate_expectation(score, expected_range):
    """
    Check whether similarity score lies within expected range.
    """
    return expected_range[0] <= score <= expected_range[1]


# ==========================================================
# Core Test Runner
# ==========================================================
def run_test(test_name, texts, metadata, expected_range):

    print_section(f"TEST: {test_name}")

    try:
        final_matrix, breakdown = compute_weighted_similarity(texts, metadata)

        print("\n📊 Final Similarity Matrix:")
        print(np.round(final_matrix, 4))

        score = float(final_matrix[0][1])
        print(f"\n🔎 Similarity Score (Doc1 vs Doc2): {round(score, 4)}")
        print(f"🎯 Expected Range: {expected_range}")

        # Structural Validation
        validate_matrix(final_matrix)
        print("\n✅ Structural Validation Passed")

        # Range Validation
        if evaluate_expectation(score, expected_range):
            print("✅ Test Result: PASS")
            return True
        else:
            print("❌ Test Result: FAIL (Score outside expected range)")
            return False

    except AssertionError as e:
        print(f"\n❌ Structural Validation Failed: {e}")
        return False

    except Exception as e:
        print(f"\n❌ Unexpected Error: {e}")
        return False


# ==========================================================
# MAIN EXECUTION
# ==========================================================
if __name__ == "__main__":

    print_section("WEIGHTED SIMILARITY SYSTEM - FULL TEST REPORT")
    print("Execution Time:", datetime.now())
    print("Testing Method: Semantic + Metadata Weighted Similarity\n")

    results = []

    # ======================================================
    # TEST 1 — IDENTICAL DOCUMENTS
    # ======================================================
    texts1 = [
        "Machine learning is part of artificial intelligence.",
        "Machine learning is part of artificial intelligence."
    ]

    metadata1 = {
        "doc1": {"size": 1000, "word_count": 8},
        "doc2": {"size": 1000, "word_count": 8},
    }

    results.append(
        run_test(
            "IDENTICAL DOCUMENTS",
            texts1,
            metadata1,
            expected_range=(0.95, 1.0)
        )
    )

    # ======================================================
    # TEST 2 — COMPLETELY DIFFERENT
    # ======================================================
    texts2 = [
        """Machine learning enables computers to learn from data.
        It is widely used in classification, regression, and clustering tasks.
        Algorithms such as neural networks and decision trees are common.""",

        """The Roman Empire expanded across Europe and Asia.
        Military strength and political strategy helped maintain control.
        Economic systems supported trade and taxation."""
    ]

    metadata2 = {
        "doc1": {"size": 800, "word_count": 30},
        "doc2": {"size": 2000, "word_count": 28},
    }

    results.append(
        run_test(
            "COMPLETELY DIFFERENT DOCUMENTS",
            texts2,
            metadata2,
            expected_range=(0.0, 0.40)
        )
    )

    # ======================================================
    # TEST 3 — PARAPHRASED CONTENT
    # ======================================================
    texts3 = [
        "Machine learning is a subset of AI.",
        "Artificial intelligence includes machine learning as a branch."
    ]

    metadata3 = {
        "doc1": {"size": 900, "word_count": 7},
        "doc2": {"size": 950, "word_count": 9},
    }

    results.append(
        run_test(
            "PARAPHRASED DOCUMENTS",
            texts3,
            metadata3,
            expected_range=(0.55, 0.85)
        )
    )

    # ======================================================
    # FINAL SUMMARY REPORT
    # ======================================================
    print_section("FINAL TEST SUMMARY")

    total = len(results)
    passed = sum(results)
    failed = total - passed

    print(f"Total Tests Run : {total}")
    print(f"Passed          : {passed}")
    print(f"Failed          : {failed}")

    if failed == 0:
        print("\n🎉 ALL TESTS PASSED SUCCESSFULLY")
    else:
        print("\n⚠️ Some tests failed. Review scoring weights.")

    print("\nSystem Validation Complete.")
