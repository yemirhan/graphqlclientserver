import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { setAccessToken } from "../accessToken";
import { useLoginMutation } from "../generated/graphql";
import { withRouter } from "react-router-dom";

function Login(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("form submitted!");
    const response = await login({
      variables: {
        email,
        password,
      },
    });
    console.log(response);
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
      props.history.push("/user");
    }

    setEmail("");
    setPassword("");
  }
  return (
    <Container>
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email-register"
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password-register"
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Sign up for Nova
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
export default withRouter(Login);
