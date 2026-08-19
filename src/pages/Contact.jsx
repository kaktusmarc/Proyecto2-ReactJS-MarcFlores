import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Contact.css";

const FAVORITE_LEAGUES = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Champions League",
  "Otra",
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Estado #3: controla si mostramos el mensaje de confirmación
  const [sent, setSent] = useState(false);

  const onSubmit = async (formData) => {
    // No hay backend real para este formulario de sugerencias, pero
    // simulamos el pequeño delay de una petición real para que la UI
    // se comporte como lo haría con una API detrás.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Sugerencia enviada:", formData);
    setSent(true);
    reset();
  };

  return (
    <div className="container contact-page">
      <h1 className="h-display contact-page__title">Sugiérenos una liga</h1>
      <p className="contact-page__subtitle">
        ¿Echas en falta alguna liga o equipo en el dashboard? Cuéntanoslo.
      </p>

      <form className="contact-form panel" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="contact-form__field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Este campo es obligatorio" })}
            style={{ borderColor: errors.name && "var(--alert)" }}
          />
          {errors.name && <p className="contact-form__error">{errors.name.message}</p>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Introduce un email válido",
              },
            })}
            style={{ borderColor: errors.email && "var(--alert)" }}
          />
          {errors.email && <p className="contact-form__error">{errors.email.message}</p>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="league">Liga favorita</label>
          <select id="league" {...register("league", { required: true })}>
            <option value="">Selecciona una liga…</option>
            {FAVORITE_LEAGUES.map((league) => (
              <option key={league} value={league}>
                {league}
              </option>
            ))}
          </select>
          {errors.league && (
            <p className="contact-form__error">Selecciona una opción</p>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows={4}
            {...register("message", {
              required: "Cuéntanos algo, aunque sea breve",
              minLength: { value: 10, message: "Escribe al menos 10 caracteres" },
            })}
            style={{ borderColor: errors.message && "var(--alert)" }}
          />
          {errors.message && (
            <p className="contact-form__error">{errors.message.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-solid" disabled={isSubmitting}>
          {isSubmitting ? "Enviando…" : "Enviar sugerencia"}
        </button>

        {sent && (
          <p className="contact-form__success" role="status">
            ¡Gracias! Hemos recibido tu sugerencia.
          </p>
        )}
      </form>
    </div>
  );
}
