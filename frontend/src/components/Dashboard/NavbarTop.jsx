import React from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaHeart, FaBars } from "react-icons/fa";
import "../../styles/Dashboard/NavbarTop.css";

export default function NavbarTop({ onToggleSidebar }) {
  return (
    <Navbar bg="white" expand="lg" className="cc-navbar-top shadow-sm py-2">
      <Container fluid className="align-items-center justify-content-between">
        
        {/* === IZQUIERDA: Botón Sidebar + Marca === */}
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="light"
            className="border-0 text-secondary me-2"
            onClick={onToggleSidebar}
            aria-label="Abrir menú lateral"
          >
            <FaBars size={22} />
          </Button>
          
          <div className="d-flex align-items-center gap-2">
            <FaHeart className="text-danger fs-4" />
            <h5 className="m-0 fw-bold text-danger">CardioControl</h5>
          </div>
        </div>

        {/* === CENTRO: Buscador === */}
        <Form className="cc-search mx-auto flex-grow-1 d-none d-md-block" style={{ maxWidth: "500px" }}>
          <div className="cc-search-wrapper position-relative">
            <FaSearch className="cc-search-icon position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <Form.Control
              type="search"
              placeholder="Buscar pacientes, registros o síntomas..."
              className="ps-5 rounded-pill border-0 shadow-sm"
              style={{ backgroundColor: "#f6f6f6", height: "38px" }}
            />
          </div>
        </Form>

        {/* === DERECHA: Perfil === */}
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://i.pravatar.cc/120?img=12"
            alt="Avatar"
            className="rounded-circle border border-2 border-danger"
            width={42}
            height={42}
          />
          <div className="d-flex flex-column lh-1 text-end">
            <span className="fw-semibold small">Dr. Miguel Sánchez</span>
            <small className="text-danger">Cerrar sesión</small>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
