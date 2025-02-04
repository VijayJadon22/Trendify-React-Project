import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useFirebase } from "../context/Firebase";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isUserLoggedIn) navigate("/");
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase.signinUserWithEmailAndPassword(
      email,
      password
    );
    console.log("result: ",result);
    navigate("/");
  };
  return (
    <div className=" sm:w-full sm:h-screen w-full  bg-gray-300 flex items-center justify-center ">
      <div className="sm:w-4xl w-full h-full p-4 grid sm:grid-cols-2 rounded">
        <div className=" flex flex-col items-center bg-white  rounded">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full py-2 px-5"
          >
            <div className="flex flex-col items-center">
              <img
                className=" w-30"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo-image"
              />
              <p className="font-bold">Get Trendified!</p>
            </div>

            <div className="flex flex-col items-start mt-5 w-full p-6">
              <p className="text-gray-600">Please login ot your account</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 my-4  focus:outline-none"
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
              <button
                type="submit"
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 cursor-pointer bg-gray-500 text-white"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={firebase.signinWithGoogle}
                className="p-1 border border-gray-400 rounded-full"
              >
                <FaGoogle className="cursor-pointer m-0" />
              </button>
            </div>
            <div className="flex items-center justify-between w-full p-6">
              <p>Don&apos;t have an account?</p>
              <Link to={"/signup"}>
                <button className="py-1 px-4 border border-gray-400 rounded cursor-pointer">
                  Signup
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className=" flex flex-col items-center justify-center p-20 text-white bg-gray-400 rounded">
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

export default Login;
