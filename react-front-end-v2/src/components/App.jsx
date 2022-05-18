import './styles/App.scss';

import Body from './Body';


import useApplicationData from '../hooks/useApplicationData';

export default function App(props) {

  const { state , setMainCategory, selectCategory, setSearchTerm, setProductsBySearch, setUser, getReviewsByAsin } = useApplicationData();
  
  return (
    <div className="App">
      <Body
        categories={state.categories}
        category={state.category}
        setMainCategory={setMainCategory}
        childCategories={state.childCategories}
        childCategory={state.childCategory}
        selectCategory={selectCategory}
        searchTerm={state.searchTerm}
        setSearch={setSearchTerm}
        searchProducts={setProductsBySearch}
        products={state.products}
        setUser={setUser}
        getReviewsByAsin={getReviewsByAsin}
        currentReviews={state.currentReviews}
      />
    </div>
  );
}