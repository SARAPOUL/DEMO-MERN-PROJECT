import React, { useState, useEffect, Fragment } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import { withRouter } from "react-router-dom";

const LoginComponent = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  useEffect(() => {
    getUser() && props.history.push("/");
  }, []);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((res) => {
        //login success
        authenticate(res, () => {
          props.history.push("/create");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  return (
    <Fragment>
      <NavbarComponent />
      <div className="container p-5">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label>Username:</label>
            <input
              type="username"
              className="form-control"
              value={username}
              onChange={handleChange("username")}
            />
          </div>
          <div className="mt-2">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-5">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default withRouter(LoginComponent);
