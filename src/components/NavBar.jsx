import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/usersContext.jsx";
import { PiShoppingCartThin } from "react-icons/pi";

// NavBar component for website navigation
const NavBar = () => {
  // Necessary functions and state from the user context
  const { isUserLoggedIn, logoutUser } = useUserContext();
  const navigate = useNavigate();

  // Handle user logout and redirect to the home page
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  // Apply the 'fixed' class only if the current route is '/'
  const navClass =
    location.pathname === "/"
      ? "w-full sm:h-16 h-20 bg-white flex items-center justify-between border-b-1 border-gray-200 z-10 fixed"
      : "w-full sm:h-16 h-20 bg-white flex items-center justify-between border-b-1 border-gray-200 z-10";

  return (
    <div className={navClass}>
      <div className="flex items-center h-full sm:ml-14 ml-4 sm:w-60 w-30 ">
        <Link to={"/"}>
          <img
            className="h-8 w-8 sm:h-15 sm:w-15"
            src={logo}
            alt="website-logo"
          />
        </Link>
        <Link to={"/"}>
          <p className="sm:text-2xl text-xl font-bold sm:m-5 m-2 text-gray-700">
            Trendify
          </p>
        </Link>
      </div>
      <div className="flex items-center sm:w-48 w-36 justify-evenly  sm:mr-14 mr-4">
        {isUserLoggedIn ? (
          <div
            onClick={handleLogout}
            className="sm:text-md text-md font-semibold text-gray-700 cursor-pointer border border-gray-400 py-0.5  px-4 rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Logout
          </div>
        ) : (
          <Link to={"/login"}>
            <div className="sm:text-md text-md font-semibold text-gray-700 cursor-pointer border border-gray-400 py-0.5  px-4 rounded-full hover:bg-gray-200 transition-all duration-300">
              Login
            </div>
          </Link>
        )}
        <Link to={"/cart"}>
          <PiShoppingCartThin className="text-2xl cursor-pointer " />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
