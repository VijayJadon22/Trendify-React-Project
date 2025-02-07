import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/usersContext";

const ProductCard = ({ product }) => {
  // Get the user login status from the UserContext
  const { isUserLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const { image, name, brand, price } = product;

  // Handle product click based on user authentication status
  const handleProductClick = (productId) => {
    if (isUserLoggedIn) {
      // Navigate to product details if logged in
      navigate(`/products/${productId}`);
    } else {
      // Navigate to login page if not logged in
      navigate("/login");
    }
  };

  return (
    <div
      onClick={() => handleProductClick(product.id)}
      className="w-48 flex flex-col hover:shadow-gray-600 shadow-lg hover:scale-101 transition-all duration-300 cursor-pointer mb-6"
    >
      {/* Product image */}
      <img src={image} alt="product-image" className="w-full " />

      {/* Product details */}
      <div className="flex flex-col p-2 mt-auto">
        <p className="font-bold">{brand}</p>
        <p className="text-gray-700 text-sm">{name}</p>
        <p className="text-sm">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
