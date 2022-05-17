import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_CATEGORIES_DATA,
  SET_CATEGORY,
  SET_PRODUCTS,
  SET_SEARCH
} from '../reducers/app';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    searchTerm: null,
    categories: [],
    category: null,
    childCategories: [],
    childCategory: null,
    products: [],
  });

  useEffect(() => {
    
    Promise.all([
      axios.get(`/api/categories`)
    ]).then((res) => {
      console.log("PROMISE ALL RESPONSE", res);
      const [categories] = res;
      dispatch({
        type: SET_CATEGORIES_DATA,
        value: {categories: categories.data}
      });
    });
  }, []);

  // function to set parent category
  const setMainCategory = (category) => {
    dispatch({
      type: SET_CATEGORY,
      value: {
        category: state.category === category ? null : category,
        childCategories: [],
        childCategory: null
      }
    });

    const selectedCategory = state.categories.find(parent => parent.id === category);

    if(selectedCategory.has_children && state.category !== category) {
      axios.get(`/api/categories/${category}`)
        .then((res) => {
          // setState(prev => ({...prev, childCategories: res.data}))

          dispatch({
            type: SET_CATEGORY,
            value: {
              category: category,
              childCategories: res.data,
              childCategory: null
            }
          })
        }).catch(err => console.error(err.message))
      return;
    };

    axios.get(`/api/products/categories/${category}`)
    .then((res) => {

      // setState(prev => ({...prev, products: res.data}))
      dispatch({
        type: SET_PRODUCTS,
        value: { products: res.data }
      });
    })
    .catch(err => console.error(err.message))
  };

  const selectCategory = (category) => {
    // setState(prev => ({...prev, childCategory}));

    dispatch({
      type: SET_CATEGORY,
      value: {
        category: state.category,
        childCategories: state.childCategories,
        childCategory: category
      }
    });

    axios.get(`/api/products/categories/${category}`)
    .then((res) => {

      // setState(prev => ({...prev, products}));
      dispatch({
        type: SET_PRODUCTS,
        value: { products: res.data }
      });
    })
    .catch(err => console.error(err.message));
  };

  const setSearchTerm = (search) => {
    // setState(prev => ({...prev, searchTerm: search}));

    dispatch({
      type: SET_SEARCH,
      value: { searchTerm: search }
    });
  };

  const setProductsBySearch = (term) => {

    if (state.childCategory || state.category) {
      const currentCategory = state.childCategories ? state.childCategory : state.category;

      axios.get(`/api/products/${currentCategory}/${term}`)
      .then((res) => {
        dispatch({
          type: SET_PRODUCTS,
          value: { products: res.data }
        });
      });
      return;
    };

    axios.get(`/api/products/${term}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUCTS,
        value: { products: res.data }
      })
    })
  }

  return { 
    state,
    setMainCategory,
    setProductsBySearch,
    selectCategory,
    setSearchTerm,
  };
}