import React, { createContext, useContext, useState, useEffect } from "react";
import { firestoreDB } from "../Database/firebaseConfig";
import { getDocs, collection, addDoc, doc, getDoc } from "firebase/firestore";

// Create a ProductContext to share product-related data and functions across components
const ProductContext = createContext(null);

// Custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);

// ProductProvider component to wrap around parts of your app where you need product-related data
export const ProductProvider = (props) => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // State to hold the selected categories for filtering
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State to hold the filtered list of products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State to hold the search query for filtering
  const [searchQuery, setSearchQuery] = useState("");

  // State to hold the price range for filtering
  const [priceRange, setPriceRange] = useState([0, 3000]);

  // Log the current price range (for debugging purposes)
  console.log(priceRange);

  // useEffect to filter products based on selected categories, search query, and price range
  useEffect(() => {
    let filtered = products;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.brand.toLowerCase().includes(searchQuery)
      );
    }
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [selectedCategories, products, searchQuery, priceRange]);

  // Effect to fetch all products when the component mounts
  useEffect(() => {
    fetchAllProducts(); // Function to fetch all products from Firestore database
  }, []);

  // Function to handle checkbox changes for category filtering
  const handleCheckboxChange = (event) => {
    try {
      const { name, checked } = event.target;
      setSelectedCategories((prev) =>
        checked ? [...prev, name] : prev.filter((category) => category !== name)
      );
    } catch (error) {
      console.log("Error filtering products, handleCheckboxChange: ", error);
    }
  };

  // Function to handle input changes for search query filtering
  const handleInputFilter = (event) => {
    try {
      setSearchQuery(event.target.value.toLowerCase());
    } catch (error) {
      console.log("Error filtering products, handleInputFilter: ", error);
    }
  };

  // Function to handle changes in the price range filter
  const handlePriceRangeChange = (event) => {
    try {
      const newRange = [0, Number(event.target.value)];
      setPriceRange(newRange);
    } catch (error) {
      console.log("Error filtering products, handlePriceRangeChange: ", error);
    }
  };

  // Function to reset all filters
  const handleResetFilter = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setPriceRange([0, 3000]);
  };

  // // uploading products
  // const uploadData = async () => {
  //   // Iterate over the data array and upload each document to Firestore
  //   const promises = data.map(async (doc) => {
  //     const collectionRef = collection(
  //       firestoreDB,
  //       "Trendify-DB",
  //       "CPb5EC3jQCNFEmZYvuRq",
  //       "products"
  //     );
  //     return await addDoc(collectionRef, doc);
  //   });
  // };

  // Function to fetch all products from the Firestore database
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
      // Update the state with the fetched products
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Function to fetch details of a single product by its ID
  const fetchProductDetails = async (productId) => {
    try {
      const docRef = doc(
        firestoreDB,
        "Trendify-DB",
        "CPb5EC3jQCNFEmZYvuRq",
        "products",
        productId
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log("Error fetching product details: ", error);
      return null;
    }
  };

  return (
    // Provide product-related data and functions to child components
    <ProductContext.Provider
      value={{
        products,
        fetchProductDetails,
        handleCheckboxChange,
        selectedCategories,
        filteredProducts,
        handleInputFilter,
        handlePriceRangeChange,
        priceRange,
        handleResetFilter,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
