from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    direccion: str
    edad: int
    rol_id: int
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str