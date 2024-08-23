import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUser, logout } from "../services/authorize";
const NavbarComponent = ({ history }) => {
  return (
    <nav className="navbar  px-4 navbar-light bg-light container-fluid">
      <ui className="nav">
        <li className="navbar-brand h1">MERN DEMO PROJECT</li>
      </ui>
      <ui className="nav">
        <li className="nav-item nav-link">
          <Link className="nav-link" to="/">
            {" "}
            Blogs
          </Link>
        </li>
        {getUser() && (
          <li className="nav-item nav-link">
            <Link className="nav-link" to="/create">
              {" "}
              Create
            </Link>
          </li>
        )}
        {!getUser() ? (
          <li className="nav-item nav-link">
            <Link className="nav-link" to="/login">
              {" "}
              Login
            </Link>
          </li>
        ) : (
          <li
            className="nav-item nav-link"
            onClick={() => logout(() => history.push("/"))}
          >
            <button className="nav-link"> Logout</button>
          </li>
        )}
      </ui>
    </nav>
  );
};
export default withRouter(NavbarComponent);
