import os
import pandas as pd


def generate_csv(candidates):
    """
    Generate CSV report for all candidates.
    """

    rows = []

    for candidate in candidates:

        rows.append({

            "Rank": candidate.get("rank"),

            "Name": candidate.get("name"),

            "Email": candidate.get("email"),

            "Phone": candidate.get("phone"),

            "ATS Score": candidate.get("ats_score"),

            "JD Match (%)": candidate.get("jd_match_score"),

            "Recommendation": candidate.get("hiring_recommendation"),

            "Confidence": candidate.get("confidence_score"),

        })

    df = pd.DataFrame(rows)

    output_folder = "reports"

    os.makedirs(output_folder, exist_ok=True)

    csv_path = os.path.join(
        output_folder,
        "Candidate_Report.csv"
    )

    df.to_csv(
        csv_path,
        index=False
    )

    return csv_path