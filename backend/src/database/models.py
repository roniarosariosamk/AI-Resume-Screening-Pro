import datetime

import sqlalchemy

from .database import Base


class Candidate(Base):

    __tablename__ = "candidates"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)

    name = sqlalchemy.Column(sqlalchemy.String)

    email = sqlalchemy.Column(sqlalchemy.String)

    phone = sqlalchemy.Column(sqlalchemy.String)

    skills = sqlalchemy.Column(sqlalchemy.String)

    education = sqlalchemy.Column(sqlalchemy.String)

    experience = sqlalchemy.Column(sqlalchemy.String)

    projects = sqlalchemy.Column(sqlalchemy.String)

    ats_score = sqlalchemy.Column(sqlalchemy.Float)

    jd_match_score = sqlalchemy.Column(sqlalchemy.Float)

    recommendation = sqlalchemy.Column(sqlalchemy.String)

    confidence = sqlalchemy.Column(sqlalchemy.Float)

    recommendation_reason = sqlalchemy.Column(sqlalchemy.String)

    matched_skills = sqlalchemy.Column(sqlalchemy.String)

    missing_skills = sqlalchemy.Column(sqlalchemy.String)

    strengths = sqlalchemy.Column(sqlalchemy.String)

    weaknesses = sqlalchemy.Column(sqlalchemy.String)

    suggestions = sqlalchemy.Column(sqlalchemy.String)

    interview_questions = sqlalchemy.Column(sqlalchemy.String)

    resume_file = sqlalchemy.Column(sqlalchemy.String)

    status = sqlalchemy.Column(sqlalchemy.String, default="Pending")

    notes = sqlalchemy.Column(sqlalchemy.String, nullable=True)

    summary = sqlalchemy.Column(sqlalchemy.String, nullable=True)

    favorite = sqlalchemy.Column(sqlalchemy.Integer, default=0)

class Recruiter(Base):

    __tablename__ = "recruiters"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)

    name = sqlalchemy.Column(sqlalchemy.String)

    email = sqlalchemy.Column(sqlalchemy.String, unique=True)

    password = sqlalchemy.Column(sqlalchemy.String)

class Interview(Base):

    __tablename__ = "interviews"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)

    candidate_id = sqlalchemy.Column(sqlalchemy.Integer)

    interview_date = sqlalchemy.Column(sqlalchemy.String)

    interview_time = sqlalchemy.Column(sqlalchemy.String)

    interviewer = sqlalchemy.Column(sqlalchemy.String)

    interview_type = sqlalchemy.Column(sqlalchemy.String)

    meeting_link = sqlalchemy.Column(sqlalchemy.String)

    round = sqlalchemy.Column(sqlalchemy.String)

    notes = sqlalchemy.Column(sqlalchemy.String)

    status = sqlalchemy.Column(sqlalchemy.String, default="Scheduled")


