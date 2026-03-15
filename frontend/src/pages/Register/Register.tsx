import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API_URL = "http://localhost:8000/api/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    direccion: "",
    edad: "",
    rol: "usuario",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const body = {
        name: formData.nombre,
        email: formData.correo,
        password: formData.password,
        direccion: formData.direccion,
        edad: Number(formData.edad),
        rol_id: 1,
        role: formData.rol
      };

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

        if (!response.ok || data.error) {
          setError(data.error || "Error al registrarse");
          return;
        }

      alert("¡Registro exitoso!");
      navigate("/login");

    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Registro</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre completo"
            className="register-input"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="email"
            placeholder="Correo"
            className="register-input"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="register-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Dirección"
            className="register-input"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="number"
            placeholder="Edad"
            className="register-input"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <select
            name="rol"
            className="register-input"
            value={formData.rol}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="invitado">Invitado</option>
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
