export const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_USER = 'SET_USER';

export default function reducer(state, action) {
  switch (action.type) {

    case SET_CATEGORIES_DATA:
      return {...state, categories: action.value.categories};
      
    case SET_USER:
      return {...state,
        user: action.value.user
      }

    case SET_SEARCH:
      return {...state, searchTerm: action.value.searchTerm};
    
    case SET_PRODUCTS:
      return {...state,
        category: action.value.category,
        childCategories: action.value.childCategories,
        childCategory: action.value.childCategory,
        products: action.value.products
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};