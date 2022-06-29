import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Filter from "../../components/filter/Filter";
import ShopProducts from "../../components/shop-products/ShopProducts";

const Shop = () => {
  return (
    <>
      <Navbar />
      <section className="product-shop-container">
        <Filter />
        <ShopProducts />
      </section>
    </>
  );
};

export default Shop;
