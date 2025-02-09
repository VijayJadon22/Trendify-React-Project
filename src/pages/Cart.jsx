import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useCartContext } from "../context/cartContext";
import { useUserContext } from "../context/usersContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useCartContext();
  const [cartTotal, setCartTotal] = useState(0);
  const { isUserLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const handleCartTotal = () => {
    const total = cartItems.reduce(
      (total, item) => (total += item.price * item.quantity),
      0
    );
    setCartTotal(total);
  };
  useEffect(() => {
    if (isUserLoggedIn) {
      if (cartItems) {
        handleCartTotal();
      }
    } else {
      navigate("/login");
    }
  }, [cartItems]);
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
            {cartItems?.map((item, index) => (
              <tr
                key={index}
                className="border-b-1 border-gray-400 md:h-16 h-12"
              >
                <td className="flex flex-col justify-center items-center md:h-16 h-12">
                  <img
                    className="md:h-13 h-10"
                    src={item.image}
                    alt="item-image"
                  />
                </td>
                <td className="text-center">
                  {item.brand} {item.name}
                </td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.quantity} </td>
                <td className="text-center">{item.price * item.quantity}</td>
                <td className="text-center">x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 md:w-xl w-full text-center">
        <h1 className="font-semibold">Cart Total</h1>
        <div className="w-full flex justify-between px-2  border-b-1 border-gray-400 mb-2">
          <span className="font-bold">Subtotal</span>
          <span> &#8377; {cartTotal}</span>
        </div>
        <div className="w-full flex justify-between px-2  border-b-1 border-gray-400 mb-2">
          <span className="font-bold">Shipping Fee</span>
          <span> Free</span>
        </div>
        <div className="w-full flex justify-between px-2  border-b-1 border-gray-400">
          <span className="font-bold">Total</span>
          <span> &#8377; {cartTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
