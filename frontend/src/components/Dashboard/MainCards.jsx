import React, { useEffect, useState } from "react";
import { FaHeartbeat, FaUserMd, FaFileMedical, FaNotesMedical, FaDownload } from "react-icons/fa";
import "../../styles/Dashboard/MainCards.css";

const MainCards = () => {
  const [data, setData] = useState({
    pacientes: 0,
    valoraciones: 0,
    citas: 0,
    seguimientos: 0,
  });

  // 🔄 Llamada al backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error cargando métricas:", error);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "PACIENTES ACTIVOS",
      value: data.pacientes,
      color: "primary",
      icon: <FaHeartbeat size={35} className="text-gray-300" />,
    },
    {
      title: "VALORACIONES REALIZADAS",
      value: data.valoraciones,
      color: "success",
      icon: <FaFileMedical size={35} className="text-gray-300" />,
    },
    {
      title: "CITAS PROGRAMADAS",
      value: data.citas,
      color: "info",
      icon: <FaUserMd size={35} className="text-gray-300" />,
    },
    {
      title: "SEGUIMIENTOS PENDIENTES",
      value: data.seguimientos,
      color: "warning",
      icon: <FaNotesMedical size={35} className="text-gray-300" />,
    },
  ];

  const handleGenerateReport = async () => {
    try {
      const res = await fetch("/api/reporte");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte-cardiovascular.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("No se pudo generar el reporte");
    }
  };

  return (
    <div className="container-fluid px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-gray-800">Dashboard</h2>
        <button className="btn-generate-report" onClick={handleGenerateReport}>
          <FaDownload className="me-2" />
          Generar Reporte
        </button>
      </div>

      <div className="row">
        {cards.map((card, i) => (
          <div className="col-xl-3 col-md-6 mb-4" key={i}>
            <div className={`card border-left-${card.color} shadow h-100 py-2`}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col me-2">
                    <div className={`text-xs fw-bold text-${card.color} text-uppercase mb-1`}>
                      {card.title}
                    </div>
                    <div className="h5 mb-0 fw-bold text-gray-800">{card.value}</div>
                  </div>
                  <div className="col-auto">{card.icon}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCards;
