import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/usersContext.jsx"; // Import the UserContext
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Signup component for new user registration
const Signup = () => {
  // State variables for email and password input fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Destructure functions and state from UserContext
  const { signupUserWithEmailAndPassword, signinWithGoogle, isUserLoggedIn } =
    useUserContext();

  // Get the navigate function from useNavigate
  const navigate = useNavigate();

  // Redirect to home page if the user is already logged in
  if (isUserLoggedIn) navigate("/");

  // Handle form submission for email and password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("signing up a user...");
    const result = await signupUserWithEmailAndPassword(email, password, name);
    console.log("user signed up: ", result);
  };

  return (
    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
      <div className="sm:w-3xl w-full h-full p-4 grid sm:grid-cols-2 rounded">
        <div className="flex flex-col items-center bg-white rounded">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full py-2"
          >
            <div className="flex flex-col items-center">
              <img
                className="w-30"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo-image"
              />
              <p className="font-bold">Get Trendified!</p>
            </div>

            <div className="flex flex-col items-start w-full p-6">
              <p className="text-gray-600">Please enter your details</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 mt-4 focus:outline-none"
                type="text"
                placeholder="Name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 my-4 focus:outline-none"
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 mb-4 focus:outline-none"
                type="password"
                placeholder="Password"
              />
              <button className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 cursor-pointer bg-gray-500 text-white">
                Signup
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={signinWithGoogle}
                className="p-1 border border-gray-400 rounded-full"
              >
                <FaGoogle className="cursor-pointer m-0" />
              </button>
            </div>

            <div className="flex items-center justify-between w-full p-3">
              <p>Login to your account</p>
              <Link to={"/login"}>
                <button
                  type="submit"
                  className="py-1 px-4 border border-gray-400 rounded cursor-pointer"
                >
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center p-20 text-white bg-gray-400 rounded">
          <h1>We are more than just a company</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
