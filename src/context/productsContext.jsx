import React, { createContext, useContext, useState, useEffect } from "react";
import { firestoreDB } from "../Database/firebaseConfig";
import { getDocs, collection, addDoc, doc, getDoc } from "firebase/firestore";

const data = [
  {
    brand: "Nike",
    category: "men",
    price: 549,
    name: "Tshirt",
    sizes: ["S", "L", "XL"],
    stock: 4,
    image:
      "https://www.cottonheritage.com/catImg/WAMSMALL/mc1040_082924094923.jpg",
  },
  {
    brand: "Nike",
    category: "men",
    price: 549,
    name: "Tshirt",
    sizes: ["S", "L", "XL"],
    stock: 4,
    image:
      "https://th.bing.com/th/id/OIP.RHzRocDQ-VPOif5AmSbAeQHaKl?rs=1&pid=ImgDetMain",
  },
  {
    brand: "Mufti",
    category: "men",
    price: 200,
    name: "Tshirt",
    sizes: ["S", "M", "L", "XL"],
    stock: 4,
    image:
      "https://www.cottonheritage.com/catImg/WAMSMALL/MC1086_040924092749.jpg",
  },
  {
    brand: "Blue Buddha",
    category: "men",
    price: 2000,
    name: "Sweat Pants",
    sizes: ["M", "L", "XL"],
    stock: 10,
    image:
      "https://www.cottonheritage.com/catImg/WAMLARGE/M7450_111723153946.jpg",
  },
  {
    brand: "Zara",
    category: "men",
    price: 500,
    name: "Shorts",
    sizes: ["M", "L", "XL"],
    stock: 8,
    image:
      "https://www.cottonheritage.com/catImg/WAMLARGE/M7455_112123104807.jpg",
  },
  {
    brand: "Alvami Women",
    category: "women",
    price: 1200,
    name: "Kurta and Pant Set",
    sizes: ["M", "L", "XL"],
    stock: 8,
    image: "https://m.media-amazon.com/images/I/61IhrjrcrLL._SX679_.jpg",
  },
  {
    brand: "VredeVogel Women",
    category: "women",
    price: 2200,
    name: "Kurta Pant with Dupatta Set",
    sizes: ["M", "L", "XL"],
    stock: 2,
    image: "https://m.media-amazon.com/images/I/61lXK1IH8qL._SY741_.jpg",
  },
  {
    brand: "VredeVogel Women",
    category: "women",
    price: 2000,
    name: "Kurta Pant with Dupatta Set",
    sizes: ["L", "XL"],
    stock: 4,
    image: "https://m.media-amazon.com/images/I/71kYIQzC5zL._SY879_.jpg",
  },
  {
    brand: "LEOTUDE",
    category: "women",
    price: 2000,
    name: "Regular Fit Camouflage Women Tshirt",
    sizes: ["M", "L", "XL"],
    stock: 3,
    image: "https://m.media-amazon.com/images/I/71AKZojTDsL._SY741_.jpg",
  },
  {
    brand: "Googo Gaaga",
    category: "kids",
    price: 1500,
    name: "Boy's Printed Sweatshirt and Pant Set",
    sizes: ["M", "L", "XL"],
    stock: 3,
    image: "https://m.media-amazon.com/images/I/517+8nArL8L._SX679_.jpg",
  },
  {
    brand: "Toonyport",
    category: "kids",
    price: 1200,
    name: "Boys & Girls Sweatshirt and Jogger",
    sizes: ["M", "L", "XL"],
    stock: 3,
    image: "https://m.media-amazon.com/images/I/71J-MkBeJPL._SX679_.jpg",
  },
];

// Create a ProductContext to share product-related data and functions across components
const ProductContext = createContext(null);

// Custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);

// ProductProvider component to wrap around parts of your app where you need product-related data
export const ProductProvider = (props) => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  // Fetch products when the component mounts

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);

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
    setFilteredProducts(filtered);
  }, [selectedCategories, products, searchQuery]);

  useEffect(() => {
    fetchAllProducts(); //function to fetch all products from forestore database
  }, []);

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

  const handleInputFilter = (event) => {
    try {
      setSearchQuery(event.target.value.toLowerCase());
    } catch (error) {
      console.log("Error filtering products, handleInputFilter: ", error);
    }
  };

  // // uploading products
  // const uploadData = async () => {
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
      // console.log(productsList);
      // Update the state with the fetched products
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

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
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
