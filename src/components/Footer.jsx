import React from "react";

const Footer = () => {
  const date = () => {
    const d = new Date();
    return d;
  };
  return (
    <div>
      <footer className="bg-gray-800 text-center dark:bg-neutral-700 lg:text-left">
        <div className="p-4 text-center text-white dark:text-neutral-200">
          Copyright {date().getFullYear()}: Pure Hospitality
        </div>
      </footer>
    </div>
  );
};

export default Footer;
