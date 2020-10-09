import React from "react";
import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import Dash from "../components/Dash";
import Projects from "../components/Projects";

import "../style/sidebar.css";
export default function LoggedIn() {
  const [page, setPage] = useState(false);
  function handleClick(whichPage: number) {
    if (whichPage === 1) {
      setPage(true);
    } else {
      setPage(false);
    }
  }
  return (
    <div className="d-flex" id="wrapper">
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Nova </div>
        <div className="list-group list-group-flush">
          <div
            onClick={() => {
              handleClick(1);
            }}
            className="list-group-item list-group-item-action bg-light"
          >
            Dashboard
          </div>
          <div
            onClick={() => {
              handleClick(2);
            }}
            className="list-group-item list-group-item-action bg-light"
          >
            Projects
          </div>
        </div>
      </div>

      <div id="page-content-wrapper">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Ayarlar</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Çıkış</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid>{page ? <Dash /> : <Projects />}</Container>
      </div>
    </div>
  );
}
