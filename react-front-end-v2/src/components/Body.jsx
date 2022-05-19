import './styles/App.scss';

import TierList from './TierList'
import Status from './Status';
import Header from './Header';
import WishList from './WishList';

import useVisualMode from '../hooks/useVisualMode';

import { HIDDEN, RANKER, WISHES } from '../helper/modes';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';

export default function Body(props) {
  const user = {...props.user}

  const {mode, transition, back} = useVisualMode(user ? WISHES : HIDDEN);

  const getProductsByCategory = (category) => {
    props.selectCategory(category);
    transition(RANKER);
  }

  const setProductsBySearch = (term) => {
    props.searchProducts(term);
    transition(RANKER);
  }

  const showWishList = () => {
    mode === WISHES ? back() : transition(WISHES);
  }

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
      />
    {mode === HIDDEN && <></>}
    {mode === WISHES && <WishList />}
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
        getLabelsByImage={getLabelsByImage}
      />
    ))}
    </main>
  )
}