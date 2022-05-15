import { useState, useEffect } from "react";
import axios from "axios";
// import fetchProductsBySearch from "../helpers/fetchProductsBySearch";

export default function useApplicationData() {
  const [state, setState] = useState({
    products: [],
    categories: [],
    user: {}
  });

  const searchTerm = 'hello';

  useEffect(() => {
    axios.get(`/api/products/${searchTerm}`) // You can simply make your requests to "/api/whatever you want"
    .then((response) => {

      setState(prev => ({...prev, products: response.data}));

      console.log(state.products);

      // handle success
      console.log('Data from useApplicationData:', response.data) // The entire response from the Rails API
  
      console.log('Message', response.data.message) // Just the message
    }) 
  }, [state.products])

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('api/products'),
  //     axios.get('api/categories')
  //   ]).then((all) => {
  //     setState(prev => ({...prev, products: all[0].data, categories: all[1].data}));
  //   })
  // }, []);

  return { state };
}