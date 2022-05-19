import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_CATEGORIES_DATA,
  SET_PRODUCTS,
  SET_SEARCH,
  SET_USER,
  SET_REVIEWS
} from '../reducers/app';

const DB = process.env.REACT_APP_DB_HOST;

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    searchTerm: null,
    categories: [],
    category: null,
    childCategories: [],
    childCategory: null,
    products: [],
    user: {},
    currentReviews: []
  });

  const setUser = (input) => {
    return axios.post(`${DB}/user/login`, {input})
      .then((user) => {
        dispatch({ type: SET_USER, user})
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    
    Promise.all([
      axios.get(`https://api.rainforestapi.com/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`)
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
    dispatch({
      type: SET_PRODUCTS,
      value: {
        category: state.category === category ? null : category,
        childCategories: [],
        childCategory: null,
        products: state.products
      }
    });

    const selectedCategory = state.categories.find(parent => parent.id === category);

    if(selectedCategory.has_children && state.category !== category) {
      return axios.get(`https://api.rainforestapi.com/categories?api_key=${process.env.REACT_APP_API_KEY}&parent_id=${category}&domain=amazon.com`)
      
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

    return axios.get('https://api.rainforestapi.com/request', { params })
    .then((res) => {
      const response = res.data.category_results;

      dispatch({
        type: SET_PRODUCTS,
        value: { 
          category: category,
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

    return axios.get('https://api.rainforestapi.com/request', { params })
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


      return axios.get('https://api.rainforestapi.com/request', { params })
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

    return axios.get('https://api.rainforestapi.com/request', { params })
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

  const getReviewsByAsin = (asin) => {

    if (asin === null) {
      dispatch({
        type: SET_REVIEWS,
        value: { 
          currentReviews: []
        }
      })
      return;
    }

    // set up the request parameters
    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      type: "reviews",
      amazon_domain: "amazon.com",
      asin: asin
    }

    return axios.get('https://api.rainforestapi.com/request', { params })
    .then((res) => {
      const fullReviewObject = res.data;

      dispatch({
        type: SET_REVIEWS,
        value: { 
          currentReviews: [fullReviewObject.top_positive, fullReviewObject.top_critical]
        }
      })
    })
    .catch(error => console.error(error));
  }

  const getLabelsByImage = () => {
    
    console.log('hi')
    axios.get('/api/vision')
    // .then((res) => {
    //   const googleVisionData = res.data;

    //   console.log(googleVisionData);
    //   // dispatch({
    //   //   type: SET_REVIEWS,
    //   //   value: { 
    //   //     currentReviews: [fullReviewObject.top_positive, fullReviewObject.top_critical]
    //   //   }
    //   // })
    // })
    // .catch(error => console.error(error));
  }

  getLabelsByImage();

  return { 
    state,
    setMainCategory,
    setProductsBySearch,
    selectCategory,
    setSearchTerm,
    setUser,
    getReviewsByAsin
  };
}