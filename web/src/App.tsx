import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { getAccessToken, setAccessToken } from "./accessToken";

import LoginPage from "./pages/LoginPage";

import HomePage from "./pages/HomePage";
import LoggedIn from "./pages/LoggedIn";
import "./style/loading.css";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  let loggg = false;
  if (loading) {
    return (
      <Container className={"spinner"} fluid>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (getAccessToken()) {
    loggg = true;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {loggg ? <LoggedIn /> : <HomePage />}
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/terms">
          <TermsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
