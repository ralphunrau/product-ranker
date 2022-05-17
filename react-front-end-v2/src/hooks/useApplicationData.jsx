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
    // isShown: false,
    currentItem: null,
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

  const setProductsBySearch = (searchTerm) => {
    axios.get(`/api/products/${searchTerm}`)
    .then((res) => {
      const products = res.data;
      setState({...state, products})
    })
  }

  const changeCurrentItem = (image) => {
    if (image == null) {
      setState({...state, currentItem: null})
      return;
    }
    const currentItem = state.products.find(item => item.image === image);
    setState({...state, currentItem})
    console.log(currentItem);
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
    // showListItem,
    // hideListItem,
    changeCurrentItem
  };
}