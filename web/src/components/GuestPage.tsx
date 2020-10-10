import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useRegisterMutation } from "../generated/graphql";
import ContactUs from "./ContactUs";
import MovingBanner from "./MovingBanner";

export default function GuestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("form submitted!");
    const response = await register({
      variables: {
        name,
        email,
        password,
      },
    });
    console.log(response);
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <MovingBanner />
      <Container style={{ marginTop: 40, marginBottom: 40 }}>
        <h2>Who We Are</h2>
        <p className="lead text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          dolorum labore quisquam vel id dicta fuga! Ducimus, quo. Dolore
          commodi aliquid error veritatis consequuntur, excepturi cumque fuga
          eum incidunt doloremque?
        </p>
      </Container>
      {localStorage.getItem("novauserid") ? (
        <div></div>
      ) : (
        <Container style={{ marginTop: 20 }}>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="username-register"
                    className="text-muted mb-1"
                  >
                    <small>Name</small>
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    id="username-register"
                    name="username"
                    className="form-control"
                    type="text"
                    placeholder="Pick a username"
                    autoComplete="off"
                    value={name}
                  />
                </div>
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
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password-register"
                    className="text-muted mb-1"
                  >
                    <small>Password</small>
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password-register"
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="Create a password"
                    value={password}
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
      )}
      <ContactUs />
    </>
  );
}
