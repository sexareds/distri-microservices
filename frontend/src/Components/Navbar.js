import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate()
  const handlelogout = ()=>{
    localStorage.removeItem('token')
    navigate('/Login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid ">
          <Link className="navbar-brand" href="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <div>
              <Link className="btn btn-primary mx-1" to="/Login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/SignUp" role="button">
                SignUp
              </Link>
              
              
            </div>:<button className="btn btn-primary " onClick={handlelogout}>Log out</button>}
          </div>
        </div>
      </nav>
    </>
  );
}
