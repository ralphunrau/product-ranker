import { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  const [state, setState] = useState({
    products: [],
    categories: []
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/products'),
      axios.get('api/categories')
    ]).then((all) => {
      setState(prev => ({...prev, products: all[0].data, categories: all[1].data}));
    })
  }, []);

  return {
    state
  };
}

export default useApplicationData;