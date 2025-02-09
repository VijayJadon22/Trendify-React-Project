import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firestoreDB } from "../Database/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useUserContext } from "./usersContext";

// Create a context for the cart
const CartContext = createContext(null);

// Custom hook to use Cart context
export const useCartContext = () => useContext(CartContext);

// CartProvider component to manage cart state and provide context
export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(null); // State to hold cart products
  const [cartCount, setCartCount] = useState(null); // State to hold cart item count
  const { isUserLoggedIn } = useUserContext(); // Get login status from UserContext

  // Function to fetch cart items from Firestore
  const fetchCartItems = async () => {
    const collectionRef = collection(
      firestoreDB,
      "Trendify-DB",
      "CPb5EC3jQCNFEmZYvuRq",
      "users",
      firebaseAuth.currentUser.uid,
      "cart"
    );
    try {
      const cartSnapshot = await getDocs(collectionRef);
      const products = cartSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(products);

      setCartItems(products);
      setCartCount(products.length);
    } catch (error) {
      console.log("Error fetching cart items: ", error);
    }
  };

  // Fetch cart items when user login status changes
  useEffect(() => {
    if (isUserLoggedIn) {
      fetchCartItems();
    }
  }, [isUserLoggedIn]);

  // Function to add an item to the cart
  const addToCart = async (product, size, quantity) => {
    // Ensure user is authenticated before proceeding
    if (!firebaseAuth.currentUser) {
      console.error("User is not authenticated");
      return;
    }

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
      fetchCartItems(); // Fetch cart items after adding
    } catch (error) {
      console.log("Error adding item to cart: ", error); // Log any errors
    }
  };

  return (
    <CartContext.Provider value={{ addToCart, cartItems }}>
      {props.children} {/* Render children components */}
    </CartContext.Provider>
  );
};
