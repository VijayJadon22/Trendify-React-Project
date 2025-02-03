import React from "react";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div
      className="w-full sm:h-16 h-36 bg-white flex items-center 
                      justify-between border-b-1 border-gray-200"
    >
      <div className="flex items-center h-full sm:ml-14 ml-4 sm:w-60 w-30 ">
        <img
          className="h-8 w-8 sm:h-15 sm:w-15"
          src={logo}
          alt="website-logo"
        />
        <p className="sm:text-2xl text-xl font-bold sm:m-5 m-2 text-gray-700">
          Trendify
        </p>
      </div>
      <div className="text-black sm:mr-20 mr-5 sm:text-xl text-lg font-semibold">
        Login
      </div>
    </div>
  );
};

export default NavBar;
