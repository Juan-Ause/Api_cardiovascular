import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) navigate("/tasks");
  });

  return (
    <div className="container-fluid register-container d-flex justify-content-center align-items-center">
      <div className="row register-card d-flex flex-lg-row flex-column shadow-lg">
        {/* Sección izquierda: formulario */}
        <div className="col-lg-6 register-form-section">
          <h2 className="register-title mb-2 text-center">Registrarse</h2>
          <p className="register-subtitle mb-4 text-center">
            Crea tu cuenta con tu nombre y correo.
          </p>

          {registerErrors?.map((err, i) => (
            <div key={i} className="alert alert-danger py-1">
              {err}
            </div>
          ))}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  {...register("name", { required: true })}
                  className="form-control"
                  placeholder="Ejemplo: Ana Gómez"
                />
              </div>
              {errors.name && (
                <p className="text-danger mb-0">El nombre es obligatorio</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Correo institucional</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-at-fill"></i>
                </span>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="form-control"
                  placeholder="usuario@unilibre.edu.co"
                />
              </div>
              {errors.email && (
                <p className="text-danger mb-0">Correo obligatorio</p>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="form-control"
                  placeholder="********"
                />
              </div>
              {errors.password && (
                <p className="text-danger mb-0">Contraseña obligatoria</p>
              )}
            </div>

            <button className="btn register-button btn-danger w-100" type="submit">
              Crear cuenta
            </button>

            <div className="mt-3 text-center">
              <span>¿Ya tienes cuenta? </span>
              <Link to="/login" className="login-link">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>

        {/* Sección derecha: bienvenida */}
        <div className="col-lg-6 register-welcome-section d-flex flex-column justify-content-center align-items-center text-center">
          <div className="welcome-content">
            <img
              src="/public/escudo.png"
              alt="Universidad Libre"
              className="unilibre-logo mb-3"
            />
            <h2 className="welcome-title">¡Bienvenido a la Unilibre!</h2>
            <p className="welcome-text">
              Forma parte del sistema de registro clínico y bienestar
              cardiovascular.
            </p>
            <Link to="/" className="welcome-button">
              Conoce más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
