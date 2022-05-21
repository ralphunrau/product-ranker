import './styles/App.scss';

import Body from './Body';


import useApplicationData from '../hooks/useApplicationData';

export default function App() {

  const {
    state,
    setMainCategory,
    selectCategory,
    setSearchTerm,
    setProductsBySearch,
    setUser,
    signOut,
    addWish,
    removeWish,
    getWishList,
    updateList,
    getReviewsByAsin
  } = useApplicationData();
  
  return (
    <div className="App">
      <Body
        user={state.user}
        setUser={setUser}
        signOut={signOut}
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
        getReviewsByAsin={getReviewsByAsin}
        currentReviews={state.currentReviews}
        addWish={addWish}
        removeWish={removeWish}
        getWishList={getWishList}
        updateList={updateList}
        wishes={state.wishes}
      />
    </div>
  );
}