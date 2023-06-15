import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="mx-auto my-16 max-w-[700px] p-4">
      <div>
        <h1 className="py-2 text-2xl font-bold">Sign up for your account</h1>
        <p className="py-2">
          Already have an account? <Link to="/">Sign In.</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border p-3"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border p-3"
            type="password"
          />
        </div>
        <button className="m-2 mx-auto block rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a] focus:outline-none">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
