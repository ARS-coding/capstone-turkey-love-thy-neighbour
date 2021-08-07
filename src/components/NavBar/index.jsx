import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

import Logo from "../../utils/logo.svg";

import "./index.scss";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Link to="/home" className="navbar-brand">
          <img src={Logo} alt="logo" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* We'll need conditional rendering for the navlinks below */}
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/neighbours" className="nav-link">
              Neighbours
            </Link>
            <Link to="/meet" className="nav-link">
              Meet
            </Link>
          </Nav>
          <Nav>
            <Nav.Link>Sign In</Nav.Link>
            {/* TODO: Handle the click to show sign in pop up */}
            <Nav.Link>Sign Up</Nav.Link>
            {/* TODO: Handle the click to show sign in pop up */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
