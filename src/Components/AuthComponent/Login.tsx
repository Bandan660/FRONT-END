// LoginForm.tsx

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="container login-form ">
      <div className="row">
        <h1 className="text-center">Login</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <form>
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
