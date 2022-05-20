import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_CATEGORIES_DATA,
  SET_PRODUCTS,
  SET_SEARCH,
  SET_USER,
  SET_REVIEWS,
  SET_APPLICATION_DATA
} from '../reducers/app';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    searchTerm: null,
    categories: [],
    category: null,
    childCategories: [],
    childCategory: null,
    products: [],
    user: null,
    currentReviews: []
  });

  useEffect(() => {
    const loginUser = JSON.parse(window.localStorage.getItem("user"));
    const currentDate = new Date().getTime();

    if (loginUser && (currentDate - loginUser.dateCreated) < 24 * 60 * 60 * 1000) {
      
      const userWishes = JSON.parse(window.localStorage.getItem('wishList'));

      if(userWishes) {      
        axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`)  
          .then((response) => {
            dispatch({
              type: SET_APPLICATION_DATA,
              value: {categories: response.data.categories, products: userWishes, user: loginUser}
            });
          })
          .catch(error => console.error(error))
      } else {
        Promise.all([
          axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`),
          axios.get(`app/products/wishes/${loginUser.id}`)
        ]).then((response) => {
          const [ categories, products ] = response;
          dispatch({
            type: SET_APPLICATION_DATA,
            value: {categories: categories.data.categories, products: products.data, user: loginUser}
          });
        })
        .catch(error => console.error(error))
      }
      return;
    };
    localStorage.clear();

    axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`)
      .then((response) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {categories: response.data.categories, products: state.products, user: state.user}
        })
      })
    }, []);
  
  const setUser = (input) => {
     axios.post(`app/user/login`, input)
      .then((user) => {
        const loginUser = {...user.data};        
        axios.get(`app/products/wishes/${loginUser.id}`)
          .then((response) => {
            dispatch({
              type: SET_USER,
              value: {user: loginUser, products: response.data}
            })
            const currentDate = new Date().getTime();
            window.localStorage.setItem('user', JSON.stringify({...loginUser, dateCreated: currentDate}));
          })     
      })
      .catch(error => console.error(error));
  };
    
  const signOut = () => {
    return axios.post('app/user/logout')
      .then(() => {
        dispatch({
          type: SET_USER,
          value: { user: null}
        })
        localStorage.clear();
      });
  };

  const getWishList = () => {
    axios.get(`app/products/wishes/${state.user.id}`)
      .then((response) => {
        dispatch({
          type: SET_PRODUCTS,
          value: {
            category: state.category,
            childCategories: state.childCategories,
            childCategory: state.childCategory,
            products: response.data
          }
        })
      })
    .catch(error => console.error(error)); 
  };

  const updateList = (items) => {
    console.log('UPDATING LIST!......');
    Promise.all([
      items.forEach((item, i) => {
        axios.put(`app/products/wishes/save`, {...item, position: i + 1})
      })
    ]).then(() => {
      dispatch({
        type: SET_PRODUCTS,
        value: {
          category: state.category,
          childCategories: state.childCategories,
          childCategory: state.childCategory,
          products: items.map((item, i) => ({...item, position: i + 1}))
        }
      });
    })
    .catch(error => console.error(error));
  }

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
    getWishList,
    updateList,
    getReviewsByAsin
  };
}