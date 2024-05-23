// LoginForm.tsx

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../Utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../Redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { LoginResponce } from "../../Types/api_types";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/reducer/userReducer";
import CryptoJS from "crypto-js";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlewithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log(user);
    } catch (error) {
      toast.error("sign in fail");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      });
      if ("data" in res) {
        const userData = res.data.user;
        dispatch(loginSuccess(userData));
        toast.success("login success");
        const encryptedToken = CryptoJS.AES.encrypt(
          res.data.token,
          import.meta.env.VITE_SECRETETOKEN
        ).toString();
        const encryptId = CryptoJS.AES.encrypt(
          JSON.stringify(res.data.user._id),
          import.meta.env.VITE_SECRETETOKEN
        ).toString();
        const encryptRole = CryptoJS.AES.encrypt(
          JSON.stringify(res.data.user.role),
          import.meta.env.VITE_SECRETETOKEN
        ).toString();
        localStorage.setItem("$#@!%", encryptedToken);
        localStorage.setItem("$I", encryptId);
        localStorage.setItem("&5%#", encryptRole);
        window.location.href = "/";
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as LoginResponce;
        toast.error(message.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again later.");
    }
  };

  return (
    <div className="container login-form ">
      <div className="row">
        <h1 className="text-center">Login</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group w-25">
            <label>Email</label>
            <input
              type="email"
              value={email}
              className="form-control"
              onChange={handleEmailChange}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group w-25">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control "
              onChange={handlePasswordChange}
              required
              placeholder="Enter password"
            />
          </div>
          <div className="d-flex justify-content-between w-25">
            <p>Don't have an account? </p>
            <Link to="/register">Sign Up</Link>
          </div>
          <button type="submit" className="login w-25">
            Login
          </button>
        </form>
        <button className="login w-25 login mt-3" onClick={handlewithGoogle}>
          <FcGoogle /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
