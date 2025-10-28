import React, { useEffect, useState } from "react";
import { Table, Badge, Spinner } from "react-bootstrap";
import { FaHeartbeat, FaUser, FaCalendarAlt } from "react-icons/fa";
import API from "../../api/axios";
import "../../styles/Dashboard/RegistrosTabla.css";

export default function RegistroTabla() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/externo")
      .then((res) => {
        const pacientes = res.data.pacientes || [];
        const examenes = res.data.examenes_complementarios || [];
        const riesgo = res.data.riesgo_cardiovascular || [];

        const combinados = pacientes.map((p) => ({
          ...p,
          examen: examenes.find((e) => e.usuario_id === p.usuario_id),
          riesgo: riesgo.find((r) => r.usuario_id === p.usuario_id),
        }));

        setRegistros(combinados);
      })
      .catch((err) => console.error("Error cargando registros:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="registro-cargando">
        <Spinner animation="border" variant="primary" />
        <p>Cargando registros...</p>
      </div>
    );
  }

  return (
    <div className="registro-tabla-container">
      <div className="tabla-header">
        <FaHeartbeat className="icono-header" />
        <h3 className="titulo-tabla">Registros de Valoración Cardiovascular</h3>
      </div>

      <Table bordered hover responsive className="tabla-registros shadow-sm">
        <thead className="encabezado-tabla">
          <tr>
            <th><FaUser /> Paciente</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Presión Arterial</th>
            <th>IMC</th>
            <th>Glucosa</th>
            <th>Triglicéridos</th>
            <th>Riesgo</th>
            <th><FaCalendarAlt /> Fecha</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map((r) => (
              <tr key={r.usuario_id}>
                <td>{r.nombre_completo || "—"}</td>
                <td>{r.edad || "—"}</td>
                <td>{r.genero || "—"}</td>
                <td>
                  {r.examen?.pa_derecho
                    ? `${r.examen.pa_derecho}/${r.examen.pa_izquierdo} mmHg`
                    : "—"}
                </td>
                <td>{r.examen?.imc || "—"}</td>
                <td>{r.examen?.glucosa || "—"}</td>
                <td>{r.examen?.trigliceridos || "—"}</td>
                <td>
                  <Badge
                    bg={
                      r.riesgo?.categoria_riesgo === "Alto"
                        ? "danger"
                        : r.riesgo?.categoria_riesgo === "Moderado"
                        ? "warning"
                        : "success"
                    }
                  >
                    {r.riesgo?.categoria_riesgo || "Sin riesgo"}
                  </Badge>
                </td>
                <td>
                  {r.fecha_valoracion
                    ? r.fecha_valoracion.slice(0, 10)
                    : "—"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No hay registros disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
