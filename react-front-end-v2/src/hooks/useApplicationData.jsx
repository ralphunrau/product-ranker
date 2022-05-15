import { useState, useEffect } from "react";
import axios from "axios";
// import fetchProductsBySearch from "../helpers/fetchProductsBySearch";

export default function useApplicationData() {
  const [state, setState] = useState({
    products: [],
    categories: [],
    category: null,
    currentCategory: [],
    user: {}
  });

  // these are hard coded values for the search/category queries and will be taken by user input in future
  const searchTerm = 'hello';
  const categoryId = '165797011';

  const setCategory = (category) => {
    setState({... state, category})
  }

  const setProductsBySearch = (searchTerm) => {
    axios.get(`/api/products/${searchTerm}`)
    .then((res) => {
      const products = res.data;
      setState({... state, products})
    })
  }

  const getProductsByCategory = (category) => {
    axios.get(`/api/products/categories/${category}`)
      .then((res) => {
        const products = res.data;
        setState({... state, products})
      })
  }

  useEffect(() => {
    
    Promise.all([
      axios.get(`/api/categories`)
    ]).then((response) => {
      console.log("PROMISE ALL RESPONSE", response);
      const [categories] = response;

      setState(prev => ({...prev, categories: categories.data}))
    })
  }, [])

  return { state, setCategory, setProductsBySearch, getProductsByCategory };
}