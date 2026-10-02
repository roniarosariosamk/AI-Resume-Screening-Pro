import importlib
import os
from typing import Any

try:
    _supabase = importlib.import_module("supabase")
    create_client = _supabase.create_client
except (ImportError, AttributeError) as exc:
    raise ImportError(
        "The 'supabase' package is required. Install it with 'pip install supabase'."
    ) from exc
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

if not SUPABASE_URL or not SUPABASE_SECRET_KEY:
    raise ValueError("Supabase environment variables are missing")

supabase: Any = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY
)

BUCKET_NAME = "resume-files"