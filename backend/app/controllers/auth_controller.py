from sqlalchemy.orm import Session
from app.models.user_model import User


def register_user(data, db: Session):

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        direccion=data["direccion"],
        edad=data["edad"],
        rol_id=data["rol_id"],
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Usuario registrado"}


def login_user(data, db: Session):

    user = db.query(User).filter(User.email == data["email"]).first()

    if not user:
        return {"error": "Usuario no encontrado"}

    if user.password != data["password"]:
        return {"error": "Contraseña incorrecta"}

    return {
        "message": "Login exitoso",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.rol_id
        }
    }