from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv
import os

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=os.getenv("MAIL_STARTTLS") == "True",
    MAIL_SSL_TLS=os.getenv("MAIL_SSL_TLS") == "True",
    USE_CREDENTIALS=True,
)

async def send_interview_email(
    candidate_email,
    candidate_name,
    interview_date,
    interview_time,
    interviewer,
    interview_type,
    meeting_link,
    round_name,
):
    message = MessageSchema(
        subject="Interview Scheduled - AI Resume Screening",
        recipients=[candidate_email],
        body=f"""
Hello {candidate_name},

Congratulations!

Your interview has been scheduled.

Interview Details

Date: {interview_date}

Time: {interview_time}

Interviewer: {interviewer}

Round: {round_name}

Mode: {interview_type}

Meeting Link:
{meeting_link}

Please join 10 minutes before your interview.

Best Wishes,
AI Resume Screening Team
""",
        subtype="plain",
    )

    fm = FastMail(conf)

    print("=" * 50)
    print("📧 Preparing to send interview email...")
    print(f"👤 Candidate : {candidate_name}")
    print(f"📨 Email     : {candidate_email}")

    await fm.send_message(message)

    print("✅ Email sent successfully!")
    print("=" * 50)