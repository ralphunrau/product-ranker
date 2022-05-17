import { useState, useEffect } from "react";
import axios from "axios";
// import fetchProductsBySearch from "../helpers/fetchProductsBySearch";

export default function useApplicationData() {
  const [state, setState] = useState({
    products: [],
    categories: [],
    category: null,
    childCategories: [],
    childCategory: null,
    searchTerm: '',
    user: {}
  });

  // function to set parent category
  const setMainCategory = (category) => {

    // create new state for parent and child categories
    const newState = {
      category: state.category === category ? null : category,
      childCategories: [],
      childCategory: null
    }
    
    // set new state
    setState(prev => ({...prev, ...newState}));

    const selectedCategory = state.categories.find(parent => parent.id === category);

    if(selectedCategory.has_children) {
      axios.get(`/api/categories/${category}`)
        .then((res) => {
          setState(prev => ({...prev, childCategories: res.data}));
        }).catch(err => console.error(err.message));
      return;
    };

    axios.get(`/api/products/categories/${category}`)
    .then((res) => {
      const products = res.data;
      setState(prev => ({...prev, products}))
    })
    .catch(err => console.error(err.message));
  };

  const selectCategory = (category) => {
    const childCategory = category;
    setState(prev => ({...prev, childCategory}));

    axios.get(`/api/products/categories/${category}`)
    .then((res) => {
      const products = res.data;

      setState(prev => ({...prev, products}));
    })
    .catch(err => console.error(err.message));
  };

  const setSearchTerm = (search) => {
    setState(prev => ({...prev, searchTerm: search}));
  };

  const setProductsBySearch = (term) => {

    if (state.childCategory || state.category) {
      console.log('HELLO! you should not be here!')
      const currentCategory = state.childCategories ? state.childCategory : state.category;

      axios.get(`/api/products/${currentCategory}/${term}`)
      .then((res) => {
        const products = res.data;
        setState(prev => ({...prev, products}));
      })
      return;
    };
    console.log('HELLO!')
    axios.get(`/api/products/${term}`)
    .then((res) => {

      const products = res.data;

      setState(prev => ({...prev, products}));
    })
  }






  const getProductsByCategory = (category) => {
    if (state.childCategory) {
      axios.get(`/api/products/categories/${state.childCategory}`)
      .then((res) => {
        const products = res.data;
        setState(prev => ({...prev, products, childCategory: category}))
      })
      return;
    }
    axios.get(`/api/products/categories/${category}`)
    .then((res) => {
      const products = res.data;
      setState({...state, products})
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

  return { 
    state,
    setMainCategory,
    setProductsBySearch,
    getProductsByCategory,
    selectCategory,
    setSearchTerm,
  };
}