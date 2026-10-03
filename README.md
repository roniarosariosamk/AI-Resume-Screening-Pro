#  AI Resume Screening Pro

An AI-powered resume screening and candidate management platform that helps recruiters analyze resumes against job descriptions, identify relevant skills, generate candidate insights, and manage the recruitment process from a centralized dashboard.

##  Live Demo

**Frontend:**  
https://ai-resume-screening-pro-7ya1.vercel.app/

**Backend API:**  
https://ai-resume-screening-pro-11.onrender.com/

**API Documentation:**  
https://ai-resume-screening-pro-11.onrender.com/docs

---

##  Overview

AI Resume Screening Pro is a full-stack recruitment platform designed to reduce the manual effort involved in screening candidates.

Recruiters can upload resumes and job descriptions, and the system uses AI to analyze candidate profiles and generate structured insights such as:

- ATS score
- Job description match score
- Matched skills
- Missing skills
- Candidate strengths
- Candidate weaknesses
- Improvement suggestions
- Hiring recommendation
- Recommendation reasoning
- AI-generated interview questions
- Candidate summary

The platform also provides candidate management, interview scheduling, analytics, favorites, notes, status tracking, and downloadable reports.

---

##  Key Features

###  AI Resume Analysis

- Upload candidate resumes in PDF format
- Upload a job description
- Extract relevant candidate information
- Analyze resumes against job descriptions
- Generate structured AI results
- Generate ATS and JD match scores
- Generate candidate recommendations

###  Candidate Insights

For every analyzed candidate, recruiters can view:

- ATS Score
- JD Match Score
- Confidence Score
- Matched Skills
- Missing Skills
- Strengths
- Weaknesses
- Suggestions
- Recommendation
- Recommendation Reason
- Candidate Summary
- AI-generated Interview Questions

###  Candidate Management

- Candidate dashboard
- Candidate details
- Candidate analysis
- Favorite candidates
- Candidate status management
- Recruiter notes
- Resume downloads
- Candidate comparison

###  Interview Management

- Schedule interviews
- Update interview details
- Cancel/delete interviews
- Track interview type
- Add interviewer information
- Add meeting links
- Add interview notes

###  Analytics

Recruiters can view:

- ATS score distribution
- Top candidates
- Skills analytics
- Missing skills analytics
- Recruitment insights
- Candidate statistics

###  Reports

The platform supports downloading recruitment data through:

- CSV reports
- Excel reports
- Candidate analysis reports
- Resume files

###  Authentication & Security

- JWT-based authentication
- Protected API endpoints
- Recruiter-specific candidate access
- Password hashing
- Token expiration
- Input validation
- Resume file validation
- PDF-only upload validation
- File size limits
- SHA-256 duplicate resume detection
- Private cloud storage

---

##  Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Recharts
- React Circular Progressbar

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PyMuPDF

### AI

- Google Gemini
- Google GenAI SDK
- Prompt Engineering
- Structured AI Responses

### Database & Storage

- SQLAlchemy
- Supabase Storage

### Authentication & Security

- JWT
- bcrypt
- Pydantic Validation

### Deployment

- Vercel
- Render
- Supabase

### Version Control

- Git
- GitHub

---

##  Project Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
│                      Recruiter                              │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND                                 │
│                  React + Vite                               │
│                                                             │
│  • Authentication                                           │
│  • Dashboard                                                │
│  • Candidate Management                                     │
│  • Analytics                                                │
│  • Interview Management                                     │
│  • Reports                                                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                         REST API
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND                                 │
│                     FastAPI                                 │
│                                                             │
│  • Authentication                                           │
│  • Resume Upload                                            │
│  • Resume Processing                                        │
│  • Candidate Management                                     │
│  • Interview Management                                     │
│  • Analytics                                                │
│  • Reports                                                  │
└───────────────┬─────────────────┬───────────────────────────┘
                │                 │
                ▼                 ▼
       ┌────────────────┐  ┌─────────────────┐
       │   Database     │  │   Gemini AI     │
       │                │  │                 │
       │ SQLAlchemy     │  │ Resume Analysis │
       │ Candidate Data │  │ JD Matching     │
       │ Recruiters     │  │ AI Questions    │
       │ Interviews     │  │ Recommendations │
       └────────────────┘  └─────────────────┘
                │
                ▼
       ┌────────────────────┐
       │ Supabase Storage   │
       │                    │
       │ Private Resume     │
       │ Files              │
       └────────────────────┘
```

---

##  AI Resume Analysis Workflow

The project uses an AI-powered resume analysis pipeline to compare candidate resumes with job descriptions and generate structured candidate insights.

```text
                 ┌─────────────────┐
                 │ Recruiter Login │
                 └────────┬────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Upload Resume PDF │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Extract Resume    │
                │ Text & Information│
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Upload Job        │
                │ Description       │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ AI Analysis       │
                │ Gemini Model      │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Structured JSON   │
                │ Candidate Result  │
                └─────────┬─────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
          ATS Score   JD Match    Skills
              │           │           │
              └───────────┼───────────┘
                          ▼
                ┌───────────────────┐
                │ Recruiter         │
                │ Dashboard         │
                └───────────────────┘
```

---

##  Security

Security was considered throughout the application architecture.

### Authentication

- JWT-based authentication
- Token expiration
- Protected API endpoints
- Recruiter-specific authorization

### Password Security

- Passwords are hashed using bcrypt
- Passwords are never stored as plain text

### Input Validation

- Pydantic validation
- Email validation
- Registration password validation
- File type validation
- File size validation

### Resume Security

- PDF-only resume validation
- Maximum upload size
- SHA-256 duplicate resume detection
- Private cloud storage
- Recruiter ownership checks

### API Security

Sensitive endpoints require authentication before accessing recruiter data.

Protected operations include:

- Candidate data
- Resume downloads
- Reports
- Analytics
- Interviews
- Candidate updates

### Secret Management

- Sensitive credentials are stored through environment variables
- Secrets are excluded from version control using `.gitignore`

---

##  Project Structure

```text
AI-Resume-Screening-Pro/
│
├── backend/
│   │
│   ├── src/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── llm.py
│   │   └── ...
│   │
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   └── ...
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

##  Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/roniarosariosamk/AI-Resume-Screening-Pro.git

cd AI-Resume-Screening-Pro
```

---

##  Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

On Windows, activate the environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### Backend Environment Variables

Create:

```text
backend/.env
```

Use the provided example:

```text
backend/.env.example
```

Configure the required environment variables for:

- Database
- JWT secret
- Gemini API
- Supabase
- Storage

> Never commit real API keys, database credentials, JWT secrets, or other sensitive values to GitHub.

### Start the Backend

```bash
uvicorn app:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

##  Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

---

##  Production Deployment

The application uses a multi-service deployment architecture.

```text
                     Internet
                         │
                         ▼
              ┌───────────────────┐
              │      Vercel       │
              │     Frontend      │
              └─────────┬─────────┘
                        │
                       HTTPS
                        │
                        ▼
              ┌───────────────────┐
              │      Render       │
              │ FastAPI Backend   │
              └─────────┬─────────┘
                        │
             ┌──────────┼──────────┐
             │          │          │
             ▼          ▼          ▼
         Database    Gemini AI   Supabase
                                  Storage
```

### Frontend

Deployed on Vercel.

### Backend

Deployed on Render.

### AI

Google Gemini provides AI-powered resume and job-description analysis.

### Storage

Supabase provides private cloud storage for resume files.

---

##  Production Testing

The application has undergone production smoke testing covering the major recruiter workflow.

Tested functionality includes:

- Recruiter login
- Dashboard access
- Resume upload
- Job description upload
- AI analysis
- ATS scoring
- JD matching
- Candidate details
- Candidate comparison
- Candidate favorites
- Candidate status
- Recruiter notes
- Resume download
- Interview management
- Analytics
- CSV export
- Excel export

The production-tested release is:

```text
v1.1.0
```

---

##  Author

### Ronia Rosario Sam K

**B.Tech — Artificial Intelligence and Data Science**

Interested in:

- Software Engineering
- Artificial Intelligence
- Machine Learning
- Generative AI
- Full-Stack Development
- Problem Solving

### GitHub

https://github.com/roniarosariosamk
