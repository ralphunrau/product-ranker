import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_CATEGORIES_DATA,
  SET_PRODUCTS,
  SET_SEARCH,
  SET_USER
} from '../reducers/app';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    searchTerm: null,
    categories: [],
    category: null,
    childCategories: [],
    childCategory: null,
    products: [],
    user: {}
  });

  const setUser = (input) => {
    return axios.post(`app/user/login`, input)
      .then((user) => {
        dispatch({
          type: SET_USER,
          value: { user: user.data }
        })
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    console.log(state)
    Promise.all([
      axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`)
    ]).then((response) => {
      const [res] = response
      dispatch({
        type: SET_CATEGORIES_DATA,
        value: {categories: res.data.categories}
      });
    })
    .catch(error => console.error(error));
  }, []);

  // function to set parent category
  const setMainCategory = (category) => {

    const setCategory = state.category ? null : category;

    dispatch({
      type: SET_PRODUCTS,
      value: {
        category: setCategory,
        childCategories: [],
        childCategory: null,
        products: state.products
      }
    })

    if(state.categories.find(parent => parent.id === setCategory).has_children) {
      return axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&parent_id=${category}&domain=amazon.com`)
      
        .then((response) => {
         const res = response.data.categories;
          dispatch({
            type: SET_PRODUCTS,
            value: {
              category: category,
              childCategories: res,
              childCategory: null,
              products: state.products
            }
          })
        }).catch(err => console.error(err.message))
    };

    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      type: "category",
      category_id: category,
      amazon_domain: "amazon.com"
    }

    return axios.get('api/request', { params })
    .then((res) => {
      const response = res.data.category_results;

      dispatch({
        type: SET_PRODUCTS,
        value: { 
          category: state.category === null ? null : category,
          childCategories: [],
          childCategory: null,
          products: response
        }
      });
    })
    .catch(err => console.error(err.message))
  };

  // function to select child category
  const selectCategory = (category) => {

    dispatch({
      type: SET_PRODUCTS,
      value: {
        category: state.category,
        childCategories: state.childCategories,
        childCategory: category,
        products: []
      }
    });

    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      type: "category",
      category_id: category,
      amazon_domain: "amazon.com"
    }

    return axios.get('api/request', { params })
    .then((res) => {
      const response = res.data.category_results
      dispatch({
        type: SET_PRODUCTS,
        value: { 
          category: state.category,
          childCategories: state.childCategories,
          childCategory: category,
          products: response 
        }
      });
    })
    .catch(err => console.error(err.message));
  };

  const setSearchTerm = (search) => {

    dispatch({
      type: SET_SEARCH,
      value: { searchTerm: search }
    });
  };

  const setProductsBySearch = (term) => {

    dispatch({
      type: SET_PRODUCTS,
      value: { 
        category: state.category,
        childCategories: state.childCategories,
        childCategory: state.category,
        products: []
      }
    });

    if (state.childCategory || state.category) {
      const currentCategory = state.childCategories ? state.childCategory : state.category;

      const params = {
        api_key: process.env.REACT_APP_API_KEY,
        type: "search",
        category_id: currentCategory,
        search_term: term,
        amazon_domain: "amazon.com"
      };


      return axios.get('api/request', { params })
      .then((res) => {
        const response = res.data.search_results;
        dispatch({
          type: SET_PRODUCTS,
          value: { 
            category: state.category,
            childCategories: state.childCategories,
            childCategory: state.childCategory,
            products: response 
          }
        });
      })
      .catch(error => console.error(error));
    };

    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      type: "search",
      search_term: term,
      amazon_domain: "amazon.com"
    };

    return axios.get('api/request', { params })
    .then((res) => {
      const response = res.data.search_results;
      dispatch({
        type: SET_PRODUCTS,
        value: { 
          category: state.category,
            childCategories: state.childCategories,
            childCategory: state.childCategory,
            categories: state.categories,
            products: response 
        }
      })
    })
    .catch(error => console.error(error));
  }

  return { 
    state,
    setMainCategory,
    setProductsBySearch,
    selectCategory,
    setSearchTerm,
    setUser
  };
}