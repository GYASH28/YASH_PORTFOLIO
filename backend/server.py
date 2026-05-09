from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Yash Ganesh Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ========== Models ==========
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ========== Helpers ==========
def serialize_doc(doc: dict) -> dict:
    """Convert MongoDB doc -> JSON-serializable dict.
    Removes _id and converts datetime to ISO strings.
    """
    if not doc:
        return doc
    doc.pop("_id", None)
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


# ========== Routes ==========
@api_router.get("/")
async def root():
    return {"message": "Yash Ganesh Portfolio API · ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=Contact)
async def submit_contact(payload: ContactCreate):
    """Save a contact form submission to MongoDB."""
    try:
        contact = Contact(
            name=payload.name.strip(),
            email=str(payload.email).strip(),
            message=payload.message.strip(),
        )
        doc = contact.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contacts.insert_one(doc)
        logger.info(f"contact · stored · {contact.id} from {contact.email}")
        return contact
    except Exception as e:
        logger.exception("contact submit failed")
        raise HTTPException(status_code=500, detail="Could not save message right now.") from e


@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts():
    """Lightweight admin-style endpoint (no auth) listing recent submissions."""
    rows = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    out = []
    for r in rows:
        r = serialize_doc(r)
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
        out.append(r)
    return out


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
