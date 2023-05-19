import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="mx-auto my-16 max-w-[700px] p-4">
      <div>
        <h1 className="py-2 text-2xl font-bold">Sign in to your account</h1>
        <p className="py-2">
          Don't have an account yet? <Link to="/signup">Sign Up.</Link>
        </p>
      </div>
      <form>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input className="border p-3" type="email" />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input className="border p-3" type="password" />
        </div>
        <button className="m-2 mx-auto block rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a] focus:outline-none">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
