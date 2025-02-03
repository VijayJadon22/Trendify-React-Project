import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="w-full h-full">
      <div className="  grid sm:grid-cols-12  ">
        <div className="sm:col-span-2 sm:block hidden   min-h-96">
          Filter
        </div>
        <div className="sm:col-span-10 p-6 sm:grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-items-center">
          <ProductCard image="https://th.bing.com/th/id/OIP.RHzRocDQ-VPOif5AmSbAeQHaKl?rs=1&pid=ImgDetMain" />
          <ProductCard image="https://www.cottonheritage.com/catImg/WAMHIRES/MC1082589_061422125108.png" />
          <ProductCard image="https://www.cottonheritage.com/catImg/WAMLARGE/ou1964_120122165702.jpg" />
          <ProductCard image="https://www.cottonheritage.com/catImg/WAMLARGE/mc1182_082924091509.jpg" />
          <ProductCard image="https://www.cottonheritage.com/catImg/WAMSMALL/mc1040_082924094923.jpg" />
          <ProductCard image="https://www.cottonheritage.com/catImg/WAMSMALL/MC1086_040924092749.jpg" />
          <ProductCard image="https://www.cottonheritage.com/catImg/WAMLARGE/MC1220_052424103221.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
