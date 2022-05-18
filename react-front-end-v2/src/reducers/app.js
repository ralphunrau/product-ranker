export const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA';
export const SET_CATEGORY = 'SET_MAIN_CATEGORY';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SEARCH = 'SET_SEARCH';

export default function reducer(state, action) {
  switch (action.type) {

    case SET_CATEGORIES_DATA:
      return {...state, categories: action.value.categories};

    case SET_CATEGORY:
      return {...state,
        category: action.value.category,
        childCategories: action.value.childCategories,
        childCategory: action.value.childCategory
      };
    
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