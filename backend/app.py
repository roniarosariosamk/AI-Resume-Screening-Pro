import json
import os
import shutil
from typing import List

from fastapi import FastAPI, Path, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from src.schemas import recruiter
from src.parser import extract_text
from src.llm import analyze_resume

from fastapi.responses import FileResponse
from src.pdf_generator import generate_pdf
from src.csv_generator import generate_csv
from src.excel_generator import generate_excel
from src.database.database import engine, Base
from src.database.models import Candidate, Recruiter
from sqlalchemy.orm import Session
from src.database.database import SessionLocal
from src.auth.security import hash_password
from src.schemas.recruiter import (
    RecruiterRegister, RecruiterLogin
)
from src.auth.security import verify_password
from src.auth.jwt_handler import create_access_token
from fastapi.staticfiles import StaticFiles
from fastapi import HTTPException
from pathlib import Path
from src.database.models import Candidate, Recruiter, Interview  
from src.email_service import send_interview_email
from src.security import hash_password


app = FastAPI(
    title="AI Resume Screening API",
    version="2.0.0"
)

BASE_DIR = Path(__file__).resolve().parent

UPLOAD_DIR = BASE_DIR / "uploads"

print("UPLOAD_DIR =", UPLOAD_DIR)
print("EXISTS =", UPLOAD_DIR.exists())

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)

Base.metadata.create_all(bind=engine)

# ===========================
# CORS
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# Upload Folder
# ===========================

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ===========================
# Home Route
# ===========================

@app.get("/")
def home():
    return {
        "message": "AI Resume Screening Backend Running 🚀"
    }

# ===========================
# Upload Route
# ===========================

@app.post("/upload")
async def upload_resume(

    resume: List[UploadFile] = File(...),
    jd: UploadFile = File(...)

):

    print("\n========== STEP 1 ==========")
    print("Upload received")

    # -------------------------
    # Save Resume Files
    # -------------------------

    resume_paths = []

    for file in resume:

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        resume_paths.append(file_path)

    # -------------------------
    # Save JD
    # -------------------------

    jd_path = os.path.join(
        UPLOAD_FOLDER,
        jd.filename
    )

    with open(jd_path, "wb") as buffer:
        shutil.copyfileobj(jd.file, buffer)

    print("Files saved successfully")

    # -------------------------
    # Extract JD
    # -------------------------

    jd_text = extract_text(jd_path)

    print("\n========== JOB DESCRIPTION ==========\n")
    print(jd_text[:300])

    # -------------------------
    # Analyze Every Resume
    # -------------------------

    all_results = []

    for path in resume_paths:

        print("\n====================================")
        print("Analyzing:", os.path.basename(path))
        print("====================================")

        resume_text = extract_text(path)

        print("\nResume Preview:\n")
        print(resume_text[:300])

        analysis = analyze_resume(
            resume_text,
            jd_text
        )

        # Store filename

        analysis["resume_file"] = os.path.basename(path)

        all_results.append(analysis)

    # -------------------------
    # Rank Candidates
    # -------------------------

    all_results.sort(
        key=lambda x: x.get("jd_match_score", 0),
        reverse=True
    )

    # -------------------------
    # Save Candidates to Database
    # -------------------------

    db = SessionLocal()

    try:

        for candidate in all_results:
           
            new_candidate = Candidate(

                name=candidate.get("name"),

                email=candidate.get("email"),

                phone=candidate.get("phone"),

                skills=json.dumps(candidate.get("skills", [])),

                education=candidate.get("education"),

                experience=candidate.get("experience"),

                projects=candidate.get("projects"),

                summary=candidate.get("summary"),

                ats_score=candidate.get("ats_score"),

                jd_match_score=candidate.get("jd_match_score"),

                recommendation=candidate.get("hiring_recommendation"),

                confidence=candidate.get("confidence"),

                recommendation_reason=candidate.get("recommendation_reason"),

                matched_skills=json.dumps(candidate.get("matched_skills", [])),

                missing_skills=json.dumps(candidate.get("missing_skills", [])),

                strengths=json.dumps(candidate.get("strengths", [])),

                weaknesses=json.dumps(candidate.get("weaknesses", [])),

                suggestions=json.dumps(candidate.get("suggestions", [])),

                interview_questions=json.dumps(
                    candidate.get("interview_questions", [])
                ),

                resume_file=candidate.get("resume_file")

                 ) 

            db.add(new_candidate)

        db.commit()

        print("✅ Candidates saved successfully!")

    except Exception as e:

        db.rollback()

        print("❌ Database Error:", e)

    finally:

        db.close()

    # -------------------------
    # Add Rank
    # -------------------------

    for index, candidate in enumerate(all_results, start=1):
        candidate["rank"] = index

    # -------------------------
    # Console Output
    # -------------------------

    print("\n========== FINAL RANKING ==========\n")

    for candidate in all_results:

        print(
            f"Rank {candidate['rank']} | "
            f"{candidate.get('name','Unknown')} | "
            f"JD Match: {candidate.get('jd_match_score',0)}%"
        )

    # -------------------------
    # Skill Analytics
    # -------------------------

    skill_count = {}

    for candidate in all_results:

        for skill in candidate.get("skills", []):

            skill = skill.strip()

            if skill:

                skill_count[skill] = skill_count.get(skill, 0) + 1

    top_skills = sorted(

        skill_count.items(),

        key=lambda x: x[1],

        reverse=True

    )

    # -------------------------
    # Missing Skills Analytics
    # -------------------------

    missing_skill_count = {}

    for candidate in all_results:

        for skill in candidate.get("missing_skills", []):

            skill = skill.strip()

            if skill:

                missing_skill_count[skill] = (

                    missing_skill_count.get(skill, 0) + 1

                )

    top_missing_skills = sorted(

        missing_skill_count.items(),

        key=lambda x: x[1],

        reverse=True

    )

    # -------------------------
    # API Response
    # -------------------------

    return {

        "success": True,

        "total_candidates": len(all_results),

        "candidates": all_results,

        "top_skills": [

            {
                "skill": skill,
                "count": count
            }

            for skill, count in top_skills

        ],

         "top_missing_skills": [

            {
                "skill": skill,
                "count": count
            }

            for skill, count in top_missing_skills

        ]

    }

# ===========================
# Download PDF Report
# ===========================

@app.post("/download-report")
async def download_report(candidate: dict):
    """
    Generate PDF report for one candidate
    """

    pdf_path = generate_pdf(candidate)

    return FileResponse(
        path=pdf_path,
        filename=os.path.basename(pdf_path),
        media_type="application/pdf"
    )

# ===========================
# Download CSV Report
# ===========================

from fastapi import Request

@app.post("/download-csv")
async def download_csv(request: Request):

    data = await request.json()

    print("\n========== CSV DATA ==========")
    print(data)

    csv_path = generate_csv(data)

    return FileResponse(
        path=csv_path,
        filename="Candidate_Report.csv",
        media_type="text/csv"
    )

# ===========================
# Download Excel Report
# ===========================

@app.post("/download-excel")
async def download_excel(request: Request):

    candidates = await request.json()

    print("========== RECEIVED ==========")
    print(candidates)

    excel_path = generate_excel(candidates)

    return FileResponse(
        path=excel_path,
        filename="Candidate_Report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

# ===========================
# Get All Candidates
# ===========================

from sqlalchemy.orm import Session
from src.database.database import SessionLocal


@app.get("/candidates")
def get_candidates():

    db: Session = SessionLocal()

    try:

        candidates = db.query(Candidate).all()

        return candidates

    finally:

        db.close()

# ===========================
# Get Single Candidate
# ===========================

@app.get("/candidate/{candidate_id}")

def get_candidate(candidate_id: int):

    db = SessionLocal()

    try:

        candidate = db.query(Candidate).filter(

            Candidate.id == candidate_id

        ).first()

        if not candidate:

            raise HTTPException(

                status_code=404,

                detail="Candidate not found"

            )

        return {


            "id": candidate.id,

            "name": candidate.name,

            "email": candidate.email,

            "phone": candidate.phone,

            "education": candidate.education,

            "experience": candidate.experience,

            "projects": candidate.projects,

            "summary": candidate.summary,

            "ats_score": candidate.ats_score,

            "jd_match_score": candidate.jd_match_score,

            "recommendation": candidate.recommendation,

            "confidence": candidate.confidence,

            "recommendation_reason": candidate.recommendation_reason,

            "resume_file": candidate.resume_file,

            "status": candidate.status,

            "notes": candidate.notes,

            "skills": json.loads(candidate.skills or "[]"),

            "matched_skills": json.loads(candidate.matched_skills or "[]"),

            "missing_skills": json.loads(candidate.missing_skills or "[]"),

            "strengths": json.loads(candidate.strengths or "[]"),

            "weaknesses": json.loads(candidate.weaknesses or "[]"),

            "suggestions": json.loads(candidate.suggestions or "[]"),

            "interview_questions": json.loads(
                candidate.interview_questions or "[]"
            )

        }


    finally:

        db.close()

# ===========================
# Update Candidate Status
# ===========================

from fastapi import HTTPException


@app.put("/candidate/{candidate_id}/status")
def update_candidate_status(candidate_id: int, data: dict):

    db = SessionLocal()

    try:

        candidate = db.query(Candidate).filter(
            Candidate.id == candidate_id
        ).first()

        if not candidate:
            raise HTTPException(
                status_code=404,
                detail="Candidate not found"
            )

        candidate.status = data.get("status")

        db.commit()

        db.refresh(candidate)

        return {
            "message": "Status Updated Successfully",
            "candidate": candidate
        }

    finally:

        db.close()



# ===========================
# Toggle Favorite
# ===========================

@app.put("/candidate/{candidate_id}/favorite")
def toggle_favorite(candidate_id: int):

    db = SessionLocal()

    try:

        candidate = db.query(Candidate).filter(
            Candidate.id == candidate_id
        ).first()

        if not candidate:
            raise HTTPException(
                status_code=404,
                detail="Candidate not found"
            )

        candidate.favorite = 0 if candidate.favorite == 1 else 1

        db.commit()

        db.refresh(candidate)

        return {
            "message": "Favorite Updated",
            "favorite": candidate.favorite
        }

    finally:
        db.close()


# ===========================
# Schedule Interview
# ===========================

@app.post("/interview")

async def schedule_interview(data: dict):

    db = SessionLocal()

    try:

        interview = Interview(

            candidate_id=data["candidate_id"],

            interview_date=data["interview_date"],

            interview_time=data["interview_time"],

            interviewer=data["interviewer"],

            interview_type=data["interview_type"],

            meeting_link=data["meeting_link"],

            round=data["round"],

            notes=data["notes"],

            status="Scheduled"

        )

        db.add(interview)

        db.commit()

        db.refresh(interview)

        candidate = (
            db.query(Candidate)
            .filter(Candidate.id == data["candidate_id"])
            .first()
        )

        if candidate:

            await send_interview_email(

                candidate_email=candidate.email,

                candidate_name=candidate.name,

                interview_date=interview.interview_date,

                interview_time=interview.interview_time,

                interviewer=interview.interviewer,

                interview_type=interview.interview_type,
 
                meeting_link=interview.meeting_link,

                round_name=interview.round

            )

        # ==========================
        # Send Email
        # ==========================

        candidate = (

            db.query(Candidate)

            .filter(Candidate.id == data["candidate_id"])

            .first()

        )

        if candidate:

            await send_interview_email(


                candidate_email=candidate.email,

                candidate_name=candidate.name,

                interview_date=interview.interview_date,

                interview_time=interview.interview_time,

                interviewer=interview.interviewer,

                interview_type=interview.interview_type,

                meeting_link=interview.meeting_link,

                round_name=interview.round

            )

        return {

            "success": True,

            "message": "Interview Scheduled Successfully",

            "interview_id": interview.id

        }

    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "error": str(e)
        }
    finally:
        db.close()


# ==========================
# Update Interview
# ==========================

@app.put("/interview/{interview_id}")
async def update_interview(interview_id: int, data: dict):

    db = SessionLocal()

    try:

        interview = (
            db.query(Interview)
            .filter(Interview.id == interview_id)
            .first()
        )

        if not interview:
            return {
                "success": False,
                "message": "Interview not found"
            }

        interview.interview_date = data["interview_date"]
        interview.interview_time = data["interview_time"]
        interview.interviewer = data["interviewer"]
        interview.interview_type = data["interview_type"]
        interview.round = data["round"]
        interview.meeting_link = data["meeting_link"]
        interview.notes = data["notes"]

        db.commit()

        candidate = (
            db.query(Candidate)
            .filter(Candidate.id == interview.candidate_id)
            .first()
        )

        if candidate:

            await send_interview_email(

                candidate_email=candidate.email,

                candidate_name=candidate.name,

                interview_date=interview.interview_date,

                interview_time=interview.interview_time,

                interviewer=interview.interviewer,

                interview_type=interview.interview_type,

                meeting_link=interview.meeting_link,

                round_name=interview.round

            )

        return {
            "success": True,
            "message": "Interview Updated Successfully"
        }

    except Exception as e:

        db.rollback()

        return {
            "success": False,
            "error": str(e)
        }

    finally:

        db.close()


@app.delete("/interview/{interview_id}")
def delete_interview(interview_id: int):

    db = SessionLocal()

    try:

        interview = (
            db.query(Interview)
            .filter(Interview.id == interview_id)
            .first()
        )

        if not interview:
            return {
                "success": False,
                "message": "Interview not found"
            }

        db.delete(interview)

        db.commit()

        return {
            "success": True,
            "message": "Interview Deleted Successfully"
        }

    except Exception as e:

        db.rollback()

        return {
            "success": False,
            "error": str(e)
        }

    finally:

        db.close()


# ===========================
# Update Recruiter Notes
# ===========================

@app.put("/candidate/{candidate_id}/notes")
def update_candidate_notes(candidate_id: int, data: dict):

    db = SessionLocal()

    try:

        candidate = db.query(Candidate).filter(
            Candidate.id == candidate_id
        ).first()

        if not candidate:

            raise HTTPException(
                status_code=404,
                detail="Candidate not found"
            )

        candidate.notes = data.get("notes")

        db.commit()

        db.refresh(candidate)

        return {

            "message": "Notes Updated Successfully",

            "candidate": candidate

        }

    finally:

        db.close()   


# ===========================
# Dashboard Statistics
# ===========================

@app.get("/dashboard-stats")
def dashboard_stats():

    db = SessionLocal()

    try:

        total = db.query(Candidate).count()

        shortlisted = db.query(Candidate).filter(
            Candidate.status == "Shortlisted"
        ).count()

        rejected = db.query(Candidate).filter(
            Candidate.status == "Rejected"
        ).count()

        pending = db.query(Candidate).filter(
            Candidate.status == "Pending"
        ).count()

        return {

            "total": total,

            "shortlisted": shortlisted,

            "rejected": rejected,

            "pending": pending

        }

    finally:

        db.close()


# ===========================
# ATS Score Distribution
# ===========================

@app.get("/ats-distribution")
def ats_distribution():

    db = SessionLocal()

    try:

        candidates = db.query(Candidate).all()

        distribution = {

            "90-100": 0,

            "80-89": 0,

            "70-79": 0,

            "60-69": 0,

            "Below 60": 0

        }

        for candidate in candidates:

            score = candidate.ats_score or 0

            if score >= 90:

                distribution["90-100"] += 1

            elif score >= 80:

                distribution["80-89"] += 1

            elif score >= 70:

                distribution["70-79"] += 1

            elif score >= 60:

                distribution["60-69"] += 1

            else:

                distribution["Below 60"] += 1

        return distribution

    finally:

        db.close()


# ===========================
# ATS Distribution
# ===========================

@app.get("/analytics/ats-distribution")

def ats_distribution():

    db = SessionLocal()

    try:

        candidates = db.query(Candidate).all()

        return [

            {

                "name": candidate.name,

                "ats_score": candidate.ats_score

            }

            for candidate in candidates

        ]

    finally:

        db.close()
     

# ===========================
# Recruiter Register
# ===========================

@app.post("/register")
def register_recruiter(recruiter: RecruiterRegister):

    db = SessionLocal()

    try:

        # Check if email already exists
        existing_user = db.query(Recruiter).filter(
            Recruiter.email == recruiter.email
        ).first()

        if existing_user:

            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        # Hash password
        hashed_password = hash_password(recruiter.password)

        # Create recruiter
        new_recruiter = Recruiter(

            name=recruiter.name,

            email=recruiter.email,

            password=hashed_password

        )

        db.add(new_recruiter)

        db.commit()

        db.refresh(new_recruiter)

        return {
            "message": "Recruiter Registered Successfully"
        }

    finally:

        db.close()


# ===========================
# Recruiter Login
# ===========================

@app.post("/login")
def login_recruiter(login_data: RecruiterLogin):

    db = SessionLocal()

    try:

        recruiter = db.query(Recruiter).filter(
            Recruiter.email == login_data.email
        ).first()

        if not recruiter:

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        # Verify password

        if not verify_password(
            login_data.password,
            recruiter.password
       ):

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
           )

        token = create_access_token(
            {
                "sub": recruiter.email,
                "id": recruiter.id
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    finally:

        db.close()


# ==========================
# AI Hiring Insights
# ==========================

@app.get("/analytics/insights")

def hiring_insights():

    db = SessionLocal()

    try:

        candidates = db.query(Candidate).all()

        if not candidates:

            return {
                "average_ats": 0,
                "highest_ats": 0,
                "lowest_ats": 0,
                "interview_ready": 0,
                "best_candidate": "None",
                "total_candidates": 0
            }

        ats_scores = [c.ats_score for c in candidates]

        average_ats = round(sum(ats_scores) / len(ats_scores), 2)

        highest = max(candidates, key=lambda c: c.ats_score)

        lowest = min(candidates, key=lambda c: c.ats_score)

        interview_ready = len(

            [

                c

                for c in candidates

                if c.ats_score >= 80

            ]

        )

        return {

            "average_ats": average_ats,

            "highest_ats": highest.ats_score,

            "lowest_ats": lowest.ats_score,

            "interview_ready": interview_ready,

            "best_candidate": highest.name,

            "total_candidates": len(candidates)

        }

    finally:

        db.close()

# ==========================
# Top Candidates
# ==========================

@app.get("/analytics/top-candidates")

def get_top_candidates():

    db = SessionLocal()

    try:

        candidates = (

            db.query(Candidate)

            .order_by(Candidate.ats_score.desc())

            .limit(5)

            .all()

        )

        return [

            {

                "id": candidate.id,

                "name": candidate.name,

                "ats_score": candidate.ats_score,

                "jd_match_score": candidate.jd_match_score,

                "status": candidate.status

            }

            for candidate in candidates

        ]

    finally:

        db.close()

# ==========================
# Skills Analytics
# ==========================

@app.get("/analytics/skills")

def skills_analytics():

    db = SessionLocal()

    try:

        candidates = db.query(Candidate).all()

        skill_counts = {}

        missing_skill_counts = {}

        for candidate in candidates:

            if candidate.matched_skills:

                skills = [

                    skill.strip()

                    for skill in candidate.matched_skills.split(",")

                    if skill.strip()

                ]

                for skill in skills:

                    skill_counts[skill] = skill_counts.get(skill, 0) + 1

            if candidate.missing_skills:

                missing = [

                    skill.strip()

                    for skill in candidate.missing_skills.split(",")

                    if skill.strip()

                ]

                for skill in missing:

                    missing_skill_counts[skill] = (

                        missing_skill_counts.get(skill, 0) + 1

                    )

        common_skills = sorted(

            skill_counts.items(),

            key=lambda x: x[1],

            reverse=True

        )[:5]

        missing_skills = sorted(

            missing_skill_counts.items(),

            key=lambda x: x[1],

            reverse=True

        )[:5]

        return {

            "common_skills": [

                {

                    "skill": skill,

                    "count": count

                }

                for skill, count in common_skills

            ],

            "missing_skills": [

                {

                    "skill": skill,

                    "count": count

                }

                for skill, count in missing_skills

            ]

        }

    finally:

        db.close()


# ==========================
# Interview Calendar
# ==========================

@app.get("/interviews")
async def get_interviews():

    db = SessionLocal()

    try:

        interviews = db.query(Interview).all()

        print("TOTAL INTERVIEWS:", len(interviews))

        for i in interviews:
            print(i.id, i.candidate_id, i.interview_date)

        result = []

        for interview in interviews:

            candidate = (
                db.query(Candidate)
                .filter(Candidate.id == interview.candidate_id)
                .first()
            )

            if candidate:

                result.append({

                    "id": interview.id,
                    "candidate_id": candidate.id,
                    "name": candidate.name,
                    "email": candidate.email,
                    "date": interview.interview_date,
                    "time": interview.interview_time,
                    "status": candidate.status,
                    "interviewer": interview.interviewer,
                    "meeting_link": interview.meeting_link,
                    "round": interview.round,
                    "type": interview.interview_type

                })

        return result

    finally:
        db.close()