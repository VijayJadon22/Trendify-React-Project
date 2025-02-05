import React, { createContext, useContext, useState, useEffect } from "react";
import { firestoreDB } from "../Database/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

// Create a ProductContext to share product-related data and functions across components
const ProductContext = createContext(null);

// Custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);

// ProductProvider component to wrap around parts of your app where you need product-related data
export const ProductProvider = (props) => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  // Fetch products when the component mounts
    useEffect(() => {
    fetchAllProducts(); //function to fetch all products from forestore database
  }, []);

  // Function to fetch products from the Firestore database
  const fetchAllProducts = async () => {
    try {
      // Reference to the products collection
      const collectionRef = collection(
        firestoreDB,
        "Trendify-DB",
        "CPb5EC3jQCNFEmZYvuRq",
        "products"
      );
      // Get documents from the collection
      const querySnapshot = await getDocs(collectionRef);
      // Map the documents to an array of product objects
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
        console.log(productsList)
      // Update the state with the fetched products
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
  return (
    // Provide product-related data and functions to child components
    <ProductContext.Provider value={{ products }}>
      {props.children}
    </ProductContext.Provider>
  );
};
