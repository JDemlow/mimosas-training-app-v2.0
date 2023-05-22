import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/employees");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="mx-auto my-16 max-w-[700px] p-4">
      <div className="mb-5">
        <img
          src="https://static.wixstatic.com/media/23327e_faf22b12eb4d45109ccd29d36e6eb979~mv2.png/v1/crop/x_7,y_0,w_477,h_308/fill/w_616,h_396,al_c,lg_1,q_85,enc_auto/Mimosas%201_webp.png"
          alt=""
        />
      </div>
      <div>
        <h1 className="py-2 text-2xl font-bold">Sign in to your account</h1>
        {/* <p className="py-2">
          Don't have an account yet? <Link to="/signup">Sign Up.</Link>
        </p> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
          />
        </div>
        <button className="m-2 mx-auto block rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a] focus:outline-none">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
