import React from 'react';
import Product from './Product';

export default function ProductList(props) {

  const allProducts = props.products.map((product) => {
    return (
      <Product 
        title={product.title}
        id={product.asin}
        link={product.link}
        image={product.image}
        rating={product.rating}
        ratings_total={product.ratings_total}
        price={product.price.raw}
      />
    )
  })

  return (
    <div>
      {allProducts}
    </div>
 );
}

// const state = useApplicationData();

// import ProductList from './ProductList';
// import useApplicationData from '../helpers/useApplicationData';
// import React from 'react';

// <ProductList 
// products={state.products}
// />