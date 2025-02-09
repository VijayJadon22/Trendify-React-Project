import { createContext, useContext } from "react";

const CartContext = createContext(null);

export const useCartContext = () => useContext(CartContext);

const CartProvider = (props) => {
    const addToCart = (product, size, quantity) => {
      
  };
  return (
    <CartContext.Provider value={{}}>{props.children}</CartContext.Provider>
  );
};
