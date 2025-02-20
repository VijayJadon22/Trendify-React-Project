import React from "react";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/productsContext";

const Home = () => {
  // Retrieve the products from the ProductContext
  const {
    handleCheckboxChange,
    selectedCategories,
    filteredProducts,
    handleInputFilter,
    handlePriceRangeChange,
    priceRange,
    handleResetFilter
  } = useProductContext();
  // console.log(filteredProducts);

  return (
    <div className="w-full h-full mt-16">
      <div className="  grid sm:grid-cols-12  ">
        <div className="sm:col-span-2 sm:block w-full border-r border-gray-200  min-h-96 mt-4">
          <h1 className=" ml-2 text-lg font-semibold">Filters</h1>

          <div className="flex flex-col items-center text-gray-700 mt-2">
            <div className="p-2">
              <input
                onChange={handleInputFilter}
                type="text"
                placeholder="Search"
                className="border border-gray-300 mb-2 px-1 rounded outline-none w-full"
              />
            </div>
            <h3 className="border-b border-gray-200  w-full text-center">
              Categories
            </h3>
            <div className="w-full px-3 py-2 text-sm">
              <label htmlFor="men" className="flex items-center mb-1">
                <input
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("men")}
                  type="checkbox"
                  name="men"
                  id="men"
                  className="mr-3"
                />
                MEN
              </label>
              <label htmlFor="women" className="flex items-center mb-1">
                <input
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("women")}
                  type="checkbox"
                  name="women"
                  id="women"
                  className="mr-3"
                />
                WOMEN
              </label>
              <label htmlFor="kids" className="flex items-center ">
                <input
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("kids")}
                  type="checkbox"
                  name="kids"
                  id="kids"
                  className="mr-3"
                />
                KIDS
              </label>
            </div>
            <div className="mt-3 p-2 w-full">
              <label htmlFor="priceRange">
                Price Range: 0 - {priceRange[1]}
                <input
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  type="range"
                  name="priceRange"
                  id="priceRange"
                  className="h-1 w-full"
                  min={0}
                  max={5000}
                />
              </label>
            </div>
            <div className="mt-8 flex justify-center w-full">
              <button onClick={handleResetFilter} className="border rounded px-2 py-1 text-white bg-red-400 md:text-md text-sm">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-10 p-6 sm:grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
