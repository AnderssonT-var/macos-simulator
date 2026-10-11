import { useState } from "react";
import Storage from "./Storage";

export default function General() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setMsg("");

    if (!currentPass || !newPass || !confirmPass) {
      setMsg("⚠️ Completa todos los campos");
      return;
    }

    if (newPass !== confirmPass) {
      setMsg("❌ Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // ✅ VALIDAR contraseña actual
      const res = await fetch("/api/password/validate.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: currentPass }),
      });

      const data = await res.json();

      if (!data.success) {
        setMsg("❌ Contraseña actual incorrecta");
        setLoading(false);
        return;
      }

      // ✅ CAMBIAR contraseña
      const res2 = await fetch("/api/password/set.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPass,
          newPassword: newPass,
        }),
      });

      const data2 = await res2.json();

      if (data2.success) {
        setMsg("✅ Contraseña cambiada correctamente");
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      } else {
        setMsg("❌ Error al guardar: " + (data2.message || ""));
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Error de conexión");
    }

    setLoading(false);
  };

  return (
    <div className="settingsPage">
      <h2>General</h2>

      {/* CAMBIAR CONTRASEÑA */}
      <div className="settingsCard">
        <h4>Cambiar contraseña</h4>

        <input
          type="password"
          placeholder="Contraseña actual"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button className="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

        {msg && <p className="settingsMsg">{msg}</p>}
      </div>

      {/* ALMACENAMIENTO REAL */}
      <div className="settingsCard">
        <h4>Almacenamiento</h4>
        <p>Fotos y videos almacenados en la galería</p>

        <Storage />
      </div>
    </div>
  );
}