import os
import json
import re

from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

#Configure Gemini
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Gemini Model
MODEL_NAME = "gemini-3.5-flash"


def analyze_resume(resume_text, jd_text):
    """
    Analyze resume using Gemini AI
    """

    prompt = f"""
You are an expert HR recruiter.

Analyze the following resume.

Return ONLY a valid JSON object.

DO NOT include:
- Markdown
- ```json
- ```
- Explanations
- Notes
- Extra text

Return exactly this JSON format:

{{
    "name": "",
    "email": "",
    "phone": "",
    "skills": [],
    "education": "",
    "experience": "",
    "projects": "",
    "summary": "",
    "ats_score": 0,

    "jd_match_score": 0,

    "hiring_recommendation": "",
    "confidence": 0,
    "recommendation_reason": "",

    "matched_skills": [],

    "missing_skills": [],

    "strengths": [],

    "weaknesses": [],

    "suggestions": [],

    "interview_questions": [
        {{
            "question": "",
            "difficulty": "",
            "category": "" 
        }}
    ]
}}

Evaluate the resume ONLY against the Job Description provided below.

IMPORTANT:
- Do NOT use a generic Software Engineer, AI Engineer, Python Developer, or any other assumed job description.
- The uploaded Job Description is the ONLY source of truth for JD matching.
- Identify the important skills, qualifications, experience, responsibilities, and requirements from the provided JD.
- Calculate jd_match_score based ONLY on how well the resume satisfies those requirements.
- matched_skills must come from requirements explicitly present in the provided JD and supported by the resume.
- missing_skills must come from important requirements explicitly present in the provided JD but not sufficiently demonstrated in the resume.

Return:

- jd_match_score (0-100)

- matched_skills (4 to 8 important skills found in the resume)

- missing_skills (4 to 8 important requirements from the provided Job Description that are missing or insufficiently demonstrated in the resume)

Generate exactly:

- 4 strengths
- 4 weaknesses
- 4 suggestions

Generate 8 interview questions.

Rules:

- 2 Easy
- 3 Medium
- 3 Hard

Categories should include:

- Technical
- Coding
- Project
- HR

Return them inside:

"interview_questions": [
   {{
      "question": "...",
      "difficulty": "Easy",
      "category": "Technical"
   }}
]


Return ONLY valid JSON.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT add markdown.
3. Do NOT add explanations.
4. Do NOT skip any field.
5. If information is unavailable, return:
   - Empty string ""
   - Empty array []
6. ATS score must be between 0 and 100.
7. Generate EXACTLY:
   - 4 strengths
   - 4 weaknesses
   - 4 suggestions
8. Keep strengths, weaknesses and suggestions short, practical and recruiter-friendly.

Based on ATS score, JD Match score, skills, experience, and overall resume quality:

Return:

- hiring_recommendation
  (Hire / Consider / Reject)

- confidence
  (0-100)

- recommendation_reason
  (One short recruiter-friendly sentence explaining the decision.)

Rules:

Hire
- ATS >= 80
- JD Match >= 80

Consider
- ATS >= 60
- JD Match >= 60

Reject
- Otherwise

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        text = response.text.strip()

        print("\n========== GEMINI RAW RESPONSE ==========\n")
        print(text)

        # Remove markdown if Gemini returns it
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        # Extract JSON safely
        try:
            result = json.loads(text)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", text, re.DOTALL)

            if not match:
                raise Exception(
                    "Gemini did not return valid JSON.\n\n" + text
                )

            result = json.loads(match.group(0))

        # Ensure every field exists
        result.setdefault("name", "")
        result.setdefault("email", "")
        result.setdefault("phone", "")
        result.setdefault("skills", [])
        result.setdefault("education", "")
        result.setdefault("experience", "")
        result.setdefault("projects", "")
        result.setdefault("summary", "")
        result.setdefault("ats_score", 0)

        result.setdefault("jd_match_score", 0)

        result.setdefault("hiring_recommendation", "")
        result.setdefault("confidence", 0)
        result.setdefault("recommendation_reason", "")

        result.setdefault("matched_skills", [])

        result.setdefault("missing_skills", [])

        result.setdefault("strengths", [])

        result.setdefault("weaknesses", [])

        result.setdefault("suggestions", [])

        result.setdefault("interview_questions", [])

        return result

    except Exception as e:

        print("\n========== GEMINI ERROR ==========\n")
        print(str(e))

        return {
            "name": "",
            "email": "",
            "phone": "",
            "skills": [],
            "education": "",
            "experience": "",
            "projects": "",
            "summary": "",
            "ats_score": 0,

            "jd_match_score": 0,

            "hiring_recommendation": "",
            "confidence": 0,
            "recommendation_reason": "",

            "matched_skills": [],
            "missing_skills": [],

            "strengths": [],
            "weaknesses": [],
            "suggestions": [],

            "interview_questions": [],

            "success": False,
            "error": str(e)
        }