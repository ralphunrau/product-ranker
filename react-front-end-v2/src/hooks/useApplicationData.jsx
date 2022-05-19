import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_CATEGORIES_DATA,
  SET_PRODUCTS,
  SET_SEARCH,
  SET_USER,
  SET_REVIEWS
} from '../reducers/app';

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
    return axios.post(`app/user/login`, input)
      .then((user) => {
        dispatch({
          type: SET_USER,
          value: { user: user.data }
        })

        const storedUser = {...user.data, dateCreated: new Date().getTime()}
        window.localStorage.setItem('user', JSON.stringify(storedUser));
      })
      .catch(error => console.error(error));
  };
  
  const signOut = () => {
    return axios.post('app/user/logout')
      .then((user) => {
        dispatch({
          type: SET_USER,
          value: { user: user.data}
        })
        localStorage.clear();
      });
  };

  useEffect(() => {

    const loginUser = JSON.parse(window.localStorage.getItem("user"));

    const currentDate = new Date().getTime();

    if(loginUser && (currentDate - loginUser.dateCreated) < 24 * 60 * 60 * 1000) {
      dispatch({
        type: SET_USER,
        value: { user: loginUser }
      });
    } else {
      localStorage.clear();
    }

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

    const setCategory = state.category === category ? null : category;

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
      search_term: term || '',
      amazon_domain: "amazon.com"
    };


    return axios.get('api/request', { params })
    .then((res) => {
      const response = res.data.search_results;
      console.log(response)
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

  return { 
    state,
    setMainCategory,
    setProductsBySearch,
    selectCategory,
    setSearchTerm,
    setUser,
    signOut,
    getReviewsByAsin
  };
}