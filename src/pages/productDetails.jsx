import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productsContext";

const ProductDetails = () => {
  // Get products and fetchProductDetails function from ProductContext
  const { products, fetchProductDetails } = useProductContext();

  // State to hold the product details
  const [product, setProduct] = useState(null);

  // Get productId from the URL parameters
  const { productId } = useParams();
  console.log(productId);

  // useEffect to load product details when productId changes
  useEffect(() => {
    const loadProductDetails = async () => {
      // Find the product in the products array
      const product = products.find((ele) => ele.id === productId);
      if (product) {
        // If product is found in the context, set it to state
        setProduct(product);
      } else {
        // If product is not found in the context, fetch it from Firestore
        const product = await fetchProductDetails(productId);
        setProduct(product);
      }
    };
    loadProductDetails();
  }, [productId, products, fetchProductDetails]);

  // Return a message if product details are not loaded yet
  if (!product)
    return (
      <div>
        <h1>Something went wrong...</h1>
      </div>
    );

  return (
    <div className="grid lg:grid-cols-12 w-full h-full bg-gray-300">
      {/* Left section for product image */}
      <div className="lg:col-span-6 w-full h-full bg-white flex items-center justify-center py-4 px-2">
        <img className="h-full" src={product.image} alt="product-image" />
      </div>

      {/* Right section for product details */}
      <div className="lg:col-span-6 w-full h-full bg-white py-6 lg:pr-14 p-4">
        <h1 className="md:text-3xl text-2xl font-bold mb-2">{product.brand}</h1>
        <p className="md:text-2xl text-xl mb-2">{product.name}</p>
        <p className="md:text-lg text-md text-gray-400 mb-2">
          Men Rust-Coloured Solid Tailored Fit Round Neck Sweater Pure Cotton
          T-shirt
        </p>
        <p className="mb-2 font-bold">Select Size</p>

        {/* Size selection buttons */}
        <div className="md:text-lg text-md text-gray-400 mb-4">
          {product.sizes.map((e, index) => (
            <button
              key={index}
              className="border lg:w-11 lg:h-11 w-8 h-8 text-sm rounded-full mr-3 cursor-pointer hover:bg-gray-600 transition-all duration-200"
            >
              {e}
            </button>
          ))}
        </div>

        {/* Product price and discount */}
        <div className="text-black mb-4">
          <span className="font-bold md:text-xl">&#8377; {product.price} </span>
          <span className="text-gray-400 ">
            MRP &#8377;<del>1000</del>{" "}
          </span>
          <span className="text-orange-400 lg:text-lg font-bold">
            (40% OFF)
          </span>
        </div>

        {/* Add to Cart button */}
        <button className="p-2 rounded-2xl bg-red-400 text-white text-sm cursor-pointer hover:bg-pink-600 transition-all duration-200">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
