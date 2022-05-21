export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_USER = 'SET_USER';
export const SET_WISHES = 'SET_WISHES';
export const SET_REVIEWS = 'SET_REVIEWS';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';

export default function reducer(state, action) {
  switch (action.type) {
  
    case SET_USER:
      return {...state,
        user: action.value.user,
        products: action.value.products
      };

    case SET_SEARCH:
      return {...state, searchTerm: action.value.searchTerm};

    case SET_APPLICATION_DATA:
      return {...state,
        categories: action.value.categories,
        user: action.value.user,
        wishes: action.value.wishes
      };
    
    case SET_CATEGORIES:
      return {...state,
        category: action.value.category,
        childCategories: action.value.childCategories,
        childCategory: action.value.childCategory
      };
    
    case SET_PRODUCTS:
      return {...state,
        products: action.value.products,
      };

    case SET_WISHES:
      return {...state,
        wishes: action.value.wishes
      };

    case SET_REVIEWS:
      return {
        ...state,
        currentReviews: action.value.currentReviews
      }
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};