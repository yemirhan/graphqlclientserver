import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import HomePage from "./pages/HomePage";
import LoggedIn from "./pages/LoggedIn";
import "./style/loading.css";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";
import { setAccessToken } from "./accessToken";
function App() {
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
    });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
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
        <Route path="/user">
          <LoggedIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
