import os

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor


REPORT_FOLDER = "reports"

os.makedirs(REPORT_FOLDER, exist_ok=True)


def generate_pdf(candidate):
    """
    Generates a professional PDF report
    Returns the PDF file path
    """

    filename = (
        candidate["name"]
        .replace(" ", "_")
        .replace("/", "_")
        + "_Report.pdf"
    )

    pdf_path = os.path.join(REPORT_FOLDER, filename)

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    title = styles["Heading1"]
    title.alignment = TA_CENTER
    title.textColor = HexColor("#0EA5E9")

    heading = styles["Heading2"]

    normal = styles["BodyText"]

    story = []

    # -------------------------------------------------------
    # Title
    # -------------------------------------------------------

    story.append(
        Paragraph(
            "AI Resume Screening Report",
            title
        )
    )

    story.append(Spacer(1, 20))

    # -------------------------------------------------------
    # Basic Details
    # -------------------------------------------------------

    story.append(
        Paragraph(
            "<b>Candidate Name:</b> "
            + candidate.get("name", ""),
            normal,
        )
    )

    story.append(
        Paragraph(
            "<b>Email:</b> "
            + candidate.get("email", ""),
            normal,
        )
    )

    story.append(
        Paragraph(
            "<b>Phone:</b> "
            + candidate.get("phone", ""),
            normal,
        )
    )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Scores
    # -------------------------------------------------------

    story.append(Paragraph("Scores", heading))

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {candidate.get('ats_score',0)}%",
            normal,
        )
    )

    story.append(
        Paragraph(
            f"<b>JD Match Score:</b> {candidate.get('jd_match_score',0)}%",
            normal,
        )
    )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Skills
    # -------------------------------------------------------

    story.append(Paragraph("Skills", heading))

    skills = candidate.get("skills", [])

    for skill in skills:
        story.append(
            Paragraph(f"• {skill}", normal)
        )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Education
    # -------------------------------------------------------

    story.append(Paragraph("Education", heading))

    story.append(
        Paragraph(
            candidate.get("education", ""),
            normal,
        )
    )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Experience
    # -------------------------------------------------------

    story.append(Paragraph("Experience", heading))

    story.append(
        Paragraph(
            candidate.get("experience", ""),
            normal,
        )
    )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Projects
    # -------------------------------------------------------

    story.append(Paragraph("Projects", heading))

    story.append(
        Paragraph(
            candidate.get("projects", ""),
            normal,
        )
    )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Strengths
    # -------------------------------------------------------

    story.append(Paragraph("Strengths", heading))

    for item in candidate.get("strengths", []):
        story.append(
            Paragraph(f"• {item}", normal)
        )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Weaknesses
    # -------------------------------------------------------

    story.append(Paragraph("Weaknesses", heading))

    for item in candidate.get("weaknesses", []):
        story.append(
            Paragraph(f"• {item}", normal)
        )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Suggestions
    # -------------------------------------------------------

    story.append(Paragraph("Suggestions", heading))

    for item in candidate.get("suggestions", []):
        story.append(
            Paragraph(f"• {item}", normal)
        )

    story.append(Spacer(1, 15))

    # -------------------------------------------------------
    # Interview Questions
    # -------------------------------------------------------

    story.append(
        Paragraph(
            "Interview Questions",
            heading,
        )
    )

    for q in candidate.get(
        "interview_questions",
        [],
    ):

        story.append(
            Paragraph(
                f"<b>{q.get('difficulty','')}</b> | "
                f"{q.get('category','')}",
                normal,
            )
        )

        story.append(
            Paragraph(
                q.get("question", ""),
                normal,
            )
        )

        story.append(Spacer(1, 8))

    # -------------------------------------------------------
    # Footer
    # -------------------------------------------------------

    story.append(Spacer(1, 25))

    story.append(
        Paragraph(
            "<b>Generated by AI Resume Screening System</b>",
            normal,
        )
    )

    doc.build(story)

    return pdf_path