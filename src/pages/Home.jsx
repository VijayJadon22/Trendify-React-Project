import React from "react";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/productsContext";

const Home = () => {
  // Retrieve the products from the ProductContext
  const { products } = useProductContext();
  // console.log(products);

  return (
    <div className="w-full h-full mt-16">
      <div className="  grid sm:grid-cols-12  ">
        <div className="sm:col-span-2 sm:block hidden   min-h-96">Filter</div>
        <div className="sm:col-span-10 p-6 sm:grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
