from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import SessionLocal
from app.controllers.auth_controller import register_user, login_user
from app.views.responsive_view import success, error

router = APIRouter()

# Modelos Pydantic para validación
class RegisterRequest(BaseModel):
    nombre: str
    correo: str
    password: str
    direccion: str
    edad: int
    rol: str

class LoginRequest(BaseModel):
    correo: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    """Registrar un nuevo usuario"""
    roles = {"invitado": 1, "usuario": 2, "admin": 3}
    
    # Validar que el rol sea válido
    if data.rol not in roles:
        return error("Rol inválido")
    
    register_data = {
        "nombre": data.nombre,
        "correo": data.correo,
        "password": data.password,
        "direccion": data.direccion,
        "edad": data.edad,
        "rol_id": roles[data.rol]
    }
    result = register_user(register_data, db)
    return result

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """Iniciar sesión"""
    result = login_user(data.correo, data.password, db)
    return result
