import { createContext, useContext } from "react";
import { firebaseAuth, firestoreDB } from "../Database/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

// Create a context for the cart
const CartContext = createContext(null);

// Custom hook to use Cart context
export const useCartContext = () => useContext(CartContext);

// CartProvider component to manage cart state and provide context
export const CartProvider = (props) => {
  // Function to add an item to the cart
  const addToCart = async (product, size, quantity) => {
    // Reference to the collection in Firestore
    const collectionRef = collection(
      firestoreDB,
      "Trendify-DB",
      "CPb5EC3jQCNFEmZYvuRq",
      "users",
      firebaseAuth.currentUser.uid,
      "cart"
    );
    try {
      // Create an item object to add to the cart
      const item = {
        productId: product.id,
        brand: product.brand,
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        size,
        quantity,
      };
      // Add the item to the Firestore collection
      const itemDoc = await addDoc(collectionRef, item);
      console.log("Item added to cart: ", itemDoc); // Log the added item for debugging
    } catch (error) {
      console.log("Error adding item to cart: ", error); // Log any errors
    }
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      {props.children} {/* Render children components */}
    </CartContext.Provider>
  );
};
