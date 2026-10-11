import { useState } from "react";
import "./PasswordModal.css";

export default function PasswordModal({ onConfirm, onCancel }) {
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleCheck = async () => {
    const res = await fetch("/api/password/validate.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pass }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg("❌ Contraseña incorrecta");
      return;
    }

    onConfirm();
  };

  return (
    <div className="passwordModalOverlay">
      <div className="passwordModal">
        <h3>🔒 Autenticación requerida</h3>

        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {msg && <p className="error">{msg}</p>}

        <div className="actions">
          <button onClick={onCancel}>Cancelar</button>
          <button className="primary" onClick={handleCheck}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}