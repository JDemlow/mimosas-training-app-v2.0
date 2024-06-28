// components/LoadingSpinner.jsx
import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <ClipLoader color="#f6b42c" loading={true} size={150} />
  </div>
);

export default LoadingSpinner;
