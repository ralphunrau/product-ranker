import { useState, useEffect, useMemo } from 'react';

import './styles/App.scss';

import TierList from './TierList'
import Status from './Status';
import Header from './Header';
import WishList from './WishList';

import useVisualMode from '../hooks/useVisualMode';

import { HIDDEN, RANKER, WISHES } from '../helper/modes';
import { State } from '0g';

export default function Body(props) {

  const {mode, transition, back} = useVisualMode(props.user ? WISHES : HIDDEN);

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

  useEffect(() => {
    if(props.user && mode === HIDDEN) transition(WISHES);
    if(!props.user && mode === WISHES) transition(HIDDEN);
  },[props.user, transition, mode])

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
        signOut={props.signOut}
        getWishes={showWishList}
        wishes={props.wishes}
      />
    {mode === HIDDEN && <></>}
    {mode === WISHES && (
      (props.wishes.length < 1) ? <Status /> : (
      <WishList
        products={props.products}
        onRemove={props.removeWish}
        onSave={props.updateList}
        user={props.user}
        wishes={props.wishes}
        removeWish={props.removeWish}
      />
    ))}
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
      currentReviews={props.currentReviews}
      addWish={props.addWish}
      user={props.user}
      wishes={props.wishes}
      />
    ))}
    </main>
  )
}