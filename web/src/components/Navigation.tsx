import React from "react";
import { Navbar, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAccessToken } from "../accessToken";
export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Nova
        </Navbar.Brand>

        <Form inline>
          {localStorage.getItem("novauserid") ? (
            <Link to="/user">
              <Button variant="primary">User Panel</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </Form>
      </Container>
    </Navbar>
  );
}
