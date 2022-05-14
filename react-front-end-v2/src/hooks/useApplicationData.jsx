import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    header: 'HIDDEN',
    products: [],
    categories: [],
    user: {}
  });

  const setHeader = (mode) => {
    setState({...state, header: mode});
  }

  useEffect(() => {
    Promise.all([
      axios.get('api/products'),
      axios.get('api/categories')
    ]).then((all) => {
      setState(prev => ({...prev, products: all[0].data, categories: all[1].data}));
    })
  }, []);

  return { state, setHeader };
}