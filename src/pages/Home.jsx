import React from "react";

const Home = () => {
  return (
    <div className="bg-blue-300 w-full h-full">
      <div className=" bg-amber-200 grid sm:grid-cols-12  ">
        <div className="sm:col-span-2 sm:block hidden  border-1 min-h-96">Filter</div>
        <div className="sm:col-span-10  min-h-96">Products</div>
      </div>
    </div>
  );
};

export default Home;
