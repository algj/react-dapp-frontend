import React, { useState, useEffect, useCallback } from 'react';
import Banner from "../components/Banner";
import CardList from "../components/CardList";
import FilterSort from "../components/ProductsFilterSort";
import ProductCard from "../components/ProductCard";
import Config from "../Config";
import { getProducts } from "../modules/crypto";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleFilterSort = useCallback((filteredProducts) => {
    setFilteredProducts(() => filteredProducts);
  }, []);

  const cardList = React.useMemo(() => {
    return filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ));
  }, [filteredProducts]);

  return (
    <div className="w-100">
      <Banner className="lead" button={Config.banner.button}>
        {Config.banner.text}
      </Banner>
      <div className="container-fluid my-4">
        {/* <h1 className="text-white">Products</h1> */}
        <div className="my-4">
          <FilterSort className="my-4" products={products} onFinish={handleFilterSort} />
        </div>
      </div>
      <div className="container my-4">
        <CardList>
          {cardList}
        </CardList>
      </div>
    </div>
  );
};

export default Products;
