from openpyxl import Workbook
import os


def generate_excel(candidates):
    """
    Generate Excel report for all candidates
    """

    reports_folder = "reports"
    os.makedirs(reports_folder, exist_ok=True)

    file_path = os.path.join(
        reports_folder,
        "Candidate_Report.xlsx"
    )

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Candidates"

    # Header

    sheet.append([
        "Rank",
        "Candidate Name",
        "JD Match %",
        "ATS Score",
        "Email",
        "Phone",
        "Experience",
        "Skills",
        "Missing Skills",
        "Recommendation"
    ])

    # Data

    for candidate in candidates:

        sheet.append([

            candidate.get("rank", ""),

            candidate.get("name", ""),

            candidate.get("jd_match_score", ""),

            candidate.get("ats_score", ""),

            candidate.get("email", ""),

            candidate.get("phone", ""),

            candidate.get("experience", ""),

            ", ".join(candidate.get("skills", [])),

            ", ".join(candidate.get("missing_skills", [])),

            candidate.get("recommendation", "")

        ])

    workbook.save(file_path)

    return file_path