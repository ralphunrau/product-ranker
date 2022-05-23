import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_PRODUCTS,
  SET_SEARCH,
  SET_USER,
  SET_REVIEWS,
  SET_APPLICATION_DATA,
  SET_CATEGORIES,
  SET_WISHES
} from '../reducers/app';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    searchTerm: null,
    categories: [],
    category: null,
    childCategories: [],
    childCategory: null,
    products: [],
    wishes: [],
    user: null,
    currentReviews: [],
    image: null,
    reviews: {0: [], 1: [], 2: [], 3: [], 4: [], 5: []}
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
              value: {categories: response.data.categories, wishes: userWishes, user: loginUser}
            });
          })
          .catch(error => console.error(error));
      } else {
        Promise.all([
          axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`),
          axios.get(`app/products/wishes/${loginUser.id}`)
        ]).then((response) => {
          const [ categories, wishes ] = response;
          dispatch({
            type: SET_APPLICATION_DATA,
            value: {categories: categories.data.categories, wishes: wishes.data, user: loginUser}
          });
        })
        .catch(error => console.error(error));
      }
      return;
    };
    localStorage.clear();

    axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&domain=amazon.com`)
    .then((response) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {categories: response.data.categories, wishes: [], user: null}
        });
      });
    }, []);
  
  const setUser = (input) => {
    return axios.post(`app/user/login`, input)
      .then((user) => {
        const loginUser = {...user.data};        
        return axios.get(`app/products/wishes/${loginUser.id}`)
          .then((response) => {
            dispatch({
              type: SET_USER,
              value: {user: loginUser, products: response.data}
            });
            const currentDate = new Date().getTime();
            window.localStorage.setItem('user', JSON.stringify({...loginUser, dateCreated: currentDate}));
          });     
      })
      .catch(error => console.error(error));
  };
    
  const signOut = () => {
    return axios.post('app/user/logout')
      .then(() => {
        dispatch({
          type: SET_USER,
          value: { user: null}
        });
        localStorage.clear();
      });
  };

  const getWishList = () => {
    return axios.get(`app/products/wishes/${state.user.id}`)
      .then((response) => {
        console.log('RESPOI2',response)
        dispatch({
          type: SET_WISHES,
          value: { wishes: response.data }
        });
      })
    .catch(error => console.error(error)); 
  };

  const updateList = (items) => {
    Promise.all([
      items.forEach((item, i) => {
        return axios.put(`app/products/wishes/save`, {...item, position: i + 1})
      })
    ]).then(() => {
      dispatch({
        type: SET_WISHES,
        value: { wishes: items.map((item, i) => ({...item, position: i + 1})) }
      });
    })
    .catch(error => console.error(error));
  };

  const addWish = (item) => {
    return axios.post(`app/products/wishes/${state.user.id}`, item)
      .then(() => {
        console.log('Added wish!');
        return axios.get(`app/products/wishes/${state.user.id}`)
          .then((response) => {
            console.log('RESPOI',response)
            dispatch({
              type: SET_WISHES,
              value: { wishes: response.data }
            })
            window.localStorage.setItem('wishList', JSON.stringify(response.data))
        });
      })
      .catch(error => console.error(error));
  };

  const removeWish = (id) => {
    return axios.post(`app/products/remove/${state.user.id}/${id}`)
      .then(() => {
        console.log('Removed wish!');
        return axios.get(`app/products/wishes/${state.user.id}`)
          .then((response) => {
            dispatch({
              type: SET_WISHES,
              value: { wishes: response.data }
            });
            window.localStorage.setItem('wishList', JSON.stringify(response.data));
          });
      })
      .catch(error => console.error(error));
  };

  // function to set parent category
  const setMainCategory = (category) => {

    const setCategory = state.category === category ? null : category;

    dispatch({
      type: SET_CATEGORIES,
      value: { category: setCategory, childCategories: [], childCategory: null, searchTerm: null }
    })

    if(setCategory && state.categories.find(parent => parent.id === setCategory).has_children) {
      return axios.get(`api/categories?api_key=${process.env.REACT_APP_API_KEY}&parent_id=${category}&domain=amazon.com`)      
        .then((response) => {
          dispatch({
            type: SET_CATEGORIES,
            value: { category: category, childCategories: response.data.categories, childCategory: null, searchTerm: null }
          })
        }).catch(err => console.error(err.message))

    } else {
      
      const params = {
        api_key: process.env.REACT_APP_API_KEY,
        type: "category",
        category_id: category,
        amazon_domain: "amazon.com"
      };

      return axios.get('api/request', { params })
        .then((res) => {
          dispatch({
            type: SET_PRODUCTS,
            value: { products: res.data.category_results }
          });
        })
        .catch(err => console.error(err.message))
    };
  };

  // function to select child category
  const selectCategory = (category) => {

    dispatch({
      type: SET_CATEGORIES,
      value: {category: state.category, childCategories: state.childCategories, childCategory: category, searchTerm: null}
    });

    dispatch({
      type: SET_PRODUCTS,
      value: { products: [] }
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
        value: { products: response }
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
      value: { products: [] }
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
          value: { products: response }
        });
        return;
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
      dispatch({
        type: SET_PRODUCTS,
        value: {         
          products: response
        }
      });
      return;
    })
    .catch(error => console.error(error));
  }

  const getReviewsByAsin = (asin, index) => {
    const newReviews = {...state.reviews};
    newReviews[index] = [];


    dispatch({
      type: SET_REVIEWS,
      value: { 
        reviews: {...newReviews}
      }
    });

    // set up the request parameters
    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      type: "reviews",
      amazon_domain: "amazon.com",
      asin: asin
    }

    return axios.get('api/request', { params })
      .then((res) => {
        const fullReviewObject = res.data;
        newReviews[index] = [fullReviewObject.top_positive, fullReviewObject.top_critical]
        dispatch({
          type: SET_REVIEWS,
          value: { 
            reviews: {...newReviews}
        }
      })
    })
    .catch(error => console.error(error));
  }

  const getProductsByImageLabel = (label) => {

    dispatch({
      type: SET_PRODUCTS,
      value: { products: [] }
    });

    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      type: "search",
      search_term: label,
      amazon_domain: "amazon.com"
    };


    return axios.get('api/request', { params })
    .then((res) => {
      const response = res.data.search_results;
      console.log(response)
      dispatch({
        type: SET_PRODUCTS,
        value: {
          products: response,
          category: state.category,
          childCategories: state.childCategories,
          childCategory: state.childCategory
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
    addWish,
    removeWish,
    getWishList,
    updateList,
    getReviewsByAsin,
    getProductsByImageLabel
  };
}