import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productsContext";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useCartContext } from "../context/cartContext";

const ProductDetails = () => {
  // Get products and fetchProductDetails function from ProductContext
  const { products, fetchProductDetails } = useProductContext();
  const { addToCart } = useCartContext(); // Get addToCart function from CartContext

  // State to hold the product details
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null); // State to hold selected size
  const [quantity, setQuantity] = useState("1"); // State to hold quantity
  console.log("size", size, "quantity", quantity);

  // Get productId from the URL parameters
  const { productId } = useParams();

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

  // Function to handle adding product to cart
  const handleAddToCart = async () => {
    if (size) {
      await addToCart(product, size, Number(quantity)); // Call addToCart with product details
      alert("Product added to cart successfully!");
    } else {
      alert("Please select size");
    }
  };

  // Return a message if product details are not loaded yet
  if (!product) {
    return (
      <div>
        <h1>Something went wrong...</h1>
      </div>
    );
  }
  console.log(product);
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
              onClick={() => setSize(e)}
              key={index}
              className={`border lg:w-11 lg:h-11 w-8 h-8 text-sm rounded-full mr-3 cursor-pointer hover:bg-gray-600 transition-all duration-200 
                ${size === e ? "bg-gray-600 text-white" : "bg-white"}`}
            >
              {e}
            </button>
          ))}
        </div>

        <p className="mb-2 font-bold">Quantity</p>
        {/* Quantity selection buttons */}
        <div className="md:text-lg text-md text-gray-400 mb-4 flex items-center">
          <IoMdAdd
            onClick={() => setQuantity((state) => Number(state) + 1)} // Increment quantity
            className="mr-3 cursor-pointer"
          />
          {quantity}
          <GrFormSubtract
            onClick={
              () => setQuantity((state) => (state > 1 ? state - 1 : state)) // Decrement quantity
            }
            className="ml-3 cursor-pointer"
          />
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
        <button
          onClick={handleAddToCart}
          className="p-2 rounded-2xl bg-red-400 text-white text-sm cursor-pointer hover:bg-pink-600 transition-all duration-200"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
