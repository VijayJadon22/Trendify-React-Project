import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  return (
    <div className="flex flex-col items-center w-full  mt-6">
      <div className="md:w-full w-full flex justify-center">
        <table className="md:w-5xl w-full text-sm ">
          <thead>
            <tr className="border-b-1 border-gray-400">
              <th>Products</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-500 text-sm">
            <tr className="border-b-1 border-gray-400 md:h-16 h-12">
              <td className="flex flex-col justify-center items-center md:h-16 h-12">
                <img
                  className="md:h-13 h-10"
                  src="https://www.cottonheritage.com/catImg/WAMSMALL/mc1040_082924094923.jpg"
                  alt=""
                />
              </td>
              <td className="text-center">Zara Tshirt</td>
              <td className="text-center">220</td>
              <td className="text-center">2 </td>
              <td className="text-center">440</td>
              <td className="text-center">x</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 md:w-xl w-full text-center">
        <h1>Cart Total</h1>
        <div className="w-full flex justify-between px-2  border-b-1 border-gray-400 mb-2">
          <span>Subtotal</span>
          <span> &#8377; 301</span>
        </div>
        <div className="w-full flex justify-between px-2  border-b-1 border-gray-400 mb-2">
          <span>Shipping Fee</span>
          <span> Free</span>
        </div>
        <div className="w-full flex justify-between px-2  border-b-1 border-gray-400">
          <span>Total</span>
          <span> &#8377; 301</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
