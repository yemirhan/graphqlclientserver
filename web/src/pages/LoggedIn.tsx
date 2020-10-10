import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { AddNewProject } from "../components/AddNewProject";

import Dash from "../components/Dash";
import { Projects } from "../components/Projects";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

import "../style/sidebar.css";
export default function LoggedIn(props: any) {
  let match = useRouteMatch();
  const { data, loading, error } = useMeQuery({ fetchPolicy: "network-only" });
  const [logoutdata, { client }] = useLogoutMutation();
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }
  console.log(data.me?.id);
  function logout() {
    localStorage.removeItem("novauserid");
  }
  return (
    <BrowserRouter>
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Nova </div>
          <div className="list-group list-group-flush">
            <Link
              to={`${match.url}/dashboard`}
              className="list-group-item list-group-item-action bg-light"
            >
              Dashboard
            </Link>
            <Link
              to={`${match.url}/projects`}
              className="list-group-item list-group-item-action bg-light"
            >
              Projects
            </Link>
          </div>
        </div>

        <div id="page-content-wrapper">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto"></Nav>
              <Nav>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.2">
                    Ayarlar
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} onClick={logout} to={"/"}>
                    Çıkış
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Container fluid>
            <Switch>
              <Route path={`${match.path}/dashboard`} component={Dash} />

              <Route
                path={`${match.path}/projects`}
                component={Projects}
                userId={data.me?.id}
              />
              <Route path={`/addNewProject`} component={AddNewProject} />
            </Switch>
          </Container>
        </div>
      </div>
    </BrowserRouter>
  );
}
