// LoginForm.tsx

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { HtmlHTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [data, setData] = useState({
    fullname: "",

    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(data);
  };

  return (
    <div className="container login-form ">
      <div className="row">
        <h1 className="text-center">Register User</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <form>
          <div className="form-group w-25">
            <label>Full Name</label>
            <input
              type="email"
              value={data.fullname || ""}
              className="form-control"
              onChange={handleChange}
              required
              placeholder="Enter name"
            />
          </div>
          <div className="form-group w-25">
            <label>Mobile No</label>
            <input
              type="number"
              value={data.mobile || ""}
              className="form-control"
              onChange={handleChange}
              required
              placeholder="Enter mobile"
            />
          </div>
          <div className="form-group w-25">
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              className="form-control"
              onChange={handleChange}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group w-25">
            <label>Password</label>
            <input
              type="password"
              value={data.password}
              className="form-control "
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>
          <div className="d-flex justify-content-between w-25">
            <p>Already have an account? </p>
            <Link to="/login">Sign in</Link>
          </div>
          <button type="submit" className="login w-25">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
