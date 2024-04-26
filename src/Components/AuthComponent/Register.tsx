import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponce } from "../../types/api_types";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [register] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register({
        ...formData,
        role: "user",
        _id: "ereedff",
        mobile: parseInt(formData.mobile, 10),
      });
      if ("data" in res) {
        toast.success(res.data.message);
        console.log(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as MessageResponce;
        toast.error(message.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container login-form">
      <h1 className="text-center">Register User</h1>
      <div className="row d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="w-25">
          <InputField
            label="Full Name"
            name="fullname"
            type="text"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter name"
          />
          <InputField
            label="Mobile No"
            name="mobile"
            type="number"
            value={formData.mobile.toString()}
            onChange={handleChange}
            placeholder="Enter mobile"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <div className="d-flex justify-content-between">
            <p>Already have an account?</p>
            <Link to="/login">Sign in</Link>
          </div>
          <button type="submit" className="login w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="form-group w-100">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        className="form-control"
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </div>
  );
};

export default RegisterForm;
