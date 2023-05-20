import React from "react";
import { UserAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="mx-auto my-16 max-w-[600px] p-4">
      <h1 className="py-4 text-2xl font-bold">Account</h1>
      <p>User Email: {user && user.email}</p>
      <button
        onClick={handleLogout}
        className="m-2 mx-auto block rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a] focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

export default Accounts;
