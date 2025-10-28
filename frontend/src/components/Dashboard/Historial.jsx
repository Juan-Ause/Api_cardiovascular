import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/Dashboard/GraficoProgreso.css";

const GraficoProgreso = ({ usuarioId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProgreso = async () => {
      try {
        const res = await API.get(`/externo/progreso/${usuarioId}`);
        setData(res.data || []);
      } catch (err) {
        console.error("Error al cargar progreso:", err);
      }
    };
    fetchProgreso();
  }, [usuarioId]);

  if (data.length === 0) {
    return (
      <div className="grafico-card shadow-sm p-4 rounded bg-white text-center">
        <h5 className="text-primary fw-bold mb-3">Evolución de Peso e IMC</h5>
        <p className="text-muted">No hay datos disponibles</p>
      </div>
    );
  }

  // Normalizar datos
  const maxPeso = Math.max(...data.map((d) => d.peso || 0));
  const maxIMC = Math.max(...data.map((d) => d.imc || 0));
  const maxY = Math.max(maxPeso, maxIMC);

  // Escalar puntos al SVG (simple y funcional)
  const ancho = 400;
  const alto = 200;
  const padding = 30;
  const step = (ancho - padding * 2) / (data.length - 1);

  const toY = (valor) => alto - (valor / maxY) * (alto - padding * 2) - padding;

  // Generar líneas SVG
  const linePath = (key) =>
    data
      .map(
        (d, i) =>
          `${i === 0 ? "M" : "L"}${padding + i * step},${toY(d[key])}`
      )
      .join(" ");

  return (
    <div className="grafico-card shadow-sm p-4 rounded bg-white">
      <h5 className="text-center mb-3 text-primary fw-bold">
        Evolución de Peso e IMC
      </h5>
      <svg width="100%" height={alto + 40} viewBox={`0 0 ${ancho} ${alto + 40}`}>
        {/* Ejes */}
        <line x1={padding} y1={alto - padding} x2={ancho - padding} y2={alto - padding} stroke="#aaa" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={alto - padding} stroke="#aaa" strokeWidth="1" />

        {/* Línea Peso */}
        <path d={linePath("peso")} fill="none" stroke="#007bff" strokeWidth="2" />
        {/* Línea IMC */}
        <path d={linePath("imc")} fill="none" stroke="#28a745" strokeWidth="2" />

        {/* Puntos */}
        {data.map((d, i) => (
          <circle
            key={`peso-${i}`}
            cx={padding + i * step}
            cy={toY(d.peso)}
            r="3"
            fill="#007bff"
          />
        ))}
        {data.map((d, i) => (
          <circle
            key={`imc-${i}`}
            cx={padding + i * step}
            cy={toY(d.imc)}
            r="3"
            fill="#28a745"
          />
        ))}

        {/* Leyenda */}
        <text x={padding} y={alto + 20} fontSize="12" fill="#007bff">
          ● Peso (kg)
        </text>
        <text x={padding + 100} y={alto + 20} fontSize="12" fill="#28a745">
          ● IMC
        </text>
      </svg>
    </div>
  );
};

export default GraficoProgreso;
