import { useEffect } from 'react';

import './styles/App.scss';

import TierList from './TierList'
import Status from './Status';
import Header from './Header';
import WishList from './WishList';
import HomePage from './HomePage';

import useVisualMode from '../hooks/useVisualMode';

import { HIDDEN, RANKER, WISHES, HOME } from '../helper/modes';

export default function Body(props) {
  const {mode, transition, back} = useVisualMode(props.user?.id ? WISHES : HOME);

  const getProductsByCategory = (category) => {
    props.selectCategory(category);
    transition(RANKER);
  };

  const setProductsBySearch = (term) => {
    props.searchProducts(term);
    transition(RANKER);
  };

  const showWishList = () => {
    props.getWishList()
      .then(() => {
        mode === WISHES ? back() : transition(WISHES);
      })
  };

  const setProductsAndModeByImage = (label) => {
    props.getProductsByImageLabel(label);
    transition(RANKER);
  }

  const signOutAndRedirect = () => {
    transition(HOME);
    props.signOut();
  }
  
  useEffect(() => {
    if(!props.user?.id && mode === WISHES) transition(HOME);
  }, [props.user?.id, mode, transition])

  return (
    <main className="container">
      <Header
        setSearch={props.setSearch}
        searchProducts={setProductsBySearch}
        searchTerm={props.searchTerm}
        category={props.category}
        categories={props.categories}
        childCategories={props.childCategories}
        childCategory={props.childCategory}
        setMainCategory={props.setMainCategory}
        selectCategory={getProductsByCategory}
        user={props.user}
        setUser={props.setUser}
        signOut={signOutAndRedirect}
        getWishes={showWishList}
        wishes={props.wishes}
      />
    {mode === HOME && 
      <HomePage
        setSearch={props.setSearch}
        getProductsByImageLabel={setProductsAndModeByImage}
      />}
    {mode === HIDDEN && <></>}
    {mode === WISHES && 
      <WishList
        products={props.products}
        onRemove={props.removeWish}
        onSave={props.updateList}
        user={props.user}
        wishes={props.wishes}
        removeWish={props.removeWish}
        addWish={props.addWish}
        onBack={() => back()}
      />
    }
    {mode === RANKER && (
      (props.products.length < 1) ? <Status /> : (
      <TierList
      currentCategory={props.currentCategory}
      products={props.products}
      categories={props.categories}
      category={props.category}
      childCategory={props.childCategory}
      childCategories={props.childCategories}
      getReviewsByAsin={props.getReviewsByAsin}
      reviews={props.reviews}
      addWish={props.addWish}
      removeWish={props.removeWish}
      user={props.user}
      wishes={props.wishes}
      getProductsByImageLabel={props.getProductsByImageLabel}
      searchTerm={props.searchTerm}
      setSearch={props.setSearch}
      />

    ))}
    </main>
  )
}