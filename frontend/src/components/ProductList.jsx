import React, { useEffect, useState } from "react";
// import { getProducts } from "../api/api";
import Product from "./Product";
import data from "../data.json"


function ProductList() {
  const [products, setProducts] = useState(data.products);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getProducts();
  //     setProducts(data);
  //   };

  //   fetchData();
  // }, []);


  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList