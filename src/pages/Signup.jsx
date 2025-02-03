import React from "react";

const Signup = () => {
  return (
    <div className=" sm:w-full sm:h-screen w-full  bg-gray-300 flex items-center justify-center ">
      <div className="sm:w-4xl w-full h-full p-4 grid sm:grid-cols-2 rounded">
        <div className=" flex flex-col items-center bg-white  rounded">
          <form className="flex flex-col items-center w-full p-5">
            <div className="flex flex-col items-center">
              <img
                className="mt-5 w-30"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo-image"
              />
              <p className="font-bold">Get Trendified!</p>
            </div>

            <div className="flex flex-col items-start mt-5 w-full p-6">
              <p className="text-gray-600">Please enter your details</p>
              <input
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 mt-4 focus:outline-none"
                type="text"
                placeholder="Name"
              />
              <input
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 my-4  focus:outline-none"
                type="email"
                placeholder="Email"
              />
              <input
                className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 mb-4 focus:outline-none"
                type="password"
                placeholder="Password"
              />
              <button className="border border-gray-400 rounded md:w-72 w-full h-8 pl-3 cursor-pointer bg-gray-500 text-white">
                Signup
              </button>
            </div>
            <div className="flex items-center justify-between w-full p-6">
              <p>Login to your account</p>
              <button className="py-1 px-4 border border-gray-400 rounded">
                Login
              </button>
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

export default Signup;
