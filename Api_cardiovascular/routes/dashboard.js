const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Obtener métricas generales para el dashboard
router.get("/", async (req, res) => {
  try {
    const [
      totalPacientes,
      valoraciones,
      citasProgramadas,
      seguimientos
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS total FROM pacientes"),
      pool.query("SELECT COUNT(*) AS total FROM pacientes WHERE fecha_valoracion IS NOT NULL"),
      pool.query("SELECT COUNT(*) AS total FROM riesgo_cardiovascular WHERE proxima_cita >= CURRENT_DATE"),
      pool.query("SELECT COUNT(*) AS total FROM riesgo_cardiovascular WHERE proxima_cita IS NULL")
    ]);

    res.json({
      pacientes: parseInt(totalPacientes.rows[0].total),
      valoraciones: parseInt(valoraciones.rows[0].total),
      citas: parseInt(citasProgramadas.rows[0].total),
      seguimientos: parseInt(seguimientos.rows[0].total)
    });
  } catch (err) {
    console.error("Error al obtener métricas:", err.message);
    res.status(500).json({ error: "Error al obtener métricas del dashboard" });
  }
});

module.exports = router;
