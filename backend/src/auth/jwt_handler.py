import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from jose import jwt, JWTError

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from src.database.database import get_db
from src.database.models import Recruiter


# --------------------------------------------------
# LOAD BACKEND .ENV
# --------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)


# --------------------------------------------------
# JWT CONFIG
# --------------------------------------------------

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY not found in environment")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()


# --------------------------------------------------
# CREATE TOKEN
# --------------------------------------------------

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# --------------------------------------------------
# VERIFY TOKEN
# --------------------------------------------------

def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("JWT VERIFIED")
        print("JWT PAYLOAD:", payload)

        return payload

    except JWTError as e:
        print("JWT DECODE FAILED:", type(e).__name__, str(e))
        return None

# --------------------------------------------------
# CURRENT RECRUITER
# --------------------------------------------------
async def get_current_recruiter(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db=Depends(get_db)
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Your JWT stores recruiter ID in "id"
    recruiter_id = payload.get("id")

    if recruiter_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        recruiter_id = int(recruiter_id)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid recruiter ID",
            headers={"WWW-Authenticate": "Bearer"},
        )

    recruiter = (
        db.query(Recruiter)
        .filter(Recruiter.id == recruiter_id)
        .first()
    )

    if recruiter is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Recruiter not found",
        )

    return recruiter