import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorType, setErrorType] = useState(""); // New state for error type
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const openModal = (type) => {
    setErrorType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/employees");
    } catch (e) {
      setError(e.message);
      openModal(e.code); // Pass the error code as the error type
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
            placeholder="For demo: type admin@admin.com"
          />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
            placeholder="For demo: type password"
          />
        </div>

        <button className="m-2 mx-auto block rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a] focus:outline-none">
          Sign In
        </button>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <h2 className="text-xl font-bold">Please enter you credentials</h2>
            {errorType === "auth/user-not-found" && (
              <p>Invalid email address. Please try again.</p>
            )}
            {errorType === "auth/wrong-password" && (
              <p>Invalid password. Please try again.</p>
            )}
            {errorType === "auth/user-not-found,auth/wrong-password" && (
              <p>Invalid email address and password. Please try again.</p>
            )}
            <button
              className="mt-4 rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
