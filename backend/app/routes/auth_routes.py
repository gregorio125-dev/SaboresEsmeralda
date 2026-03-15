from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.schemas.user_schema import UserCreate, UserLogin
from app.controllers.auth_controller import register_user, login_user

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user.dict(), db)


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(user.dict(), db)