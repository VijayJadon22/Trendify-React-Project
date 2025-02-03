import React from "react";

// eslint-disable-next-line react/prop-types
const ProductCard = ({image}) => {
  return (
    <div className="w-48 flex flex-col   hover:shadow-gray-600 shadow-lg hover:scale-101 transition-all duration-300  cursor-pointer mb-6">
      <img
        src={image}
              alt="product-image"
              className="w-full "
      />
      <div className="flex flex-col p-2 mt-auto">
        <p className="font-bold">Arrow Sport</p>
        <p className="text-gray-700 text-sm">Men Solid Tshirt</p>
        <p className="text-sm">Rs. 1124</p>
      </div>
    </div>
  );
};

export default ProductCard;
