import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    if (credentials.cpassword !== credentials.password) {
      console.log("Not match");
    } else {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();

      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container w-50 mt-4">
      <form onSubmit={handlesubmit}>
        <h2 className="text-center">Sign up</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={onchange}
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onchange}
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassowrd" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            onChange={onchange}
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary m-2 float-end">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
