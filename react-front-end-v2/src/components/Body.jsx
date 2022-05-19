import './styles/App.scss';

import TierList from './TierList'
import Status from './Status';
import Header from './Header';
import useVisualMode from '../hooks/useVisualMode';

import { HIDDEN, RANKER } from '../helper/modes';

export default function Body(props) {
  
  const {mode, transition} = useVisualMode(HIDDEN);

  const getProductsByCategory = (category) => {
    props.selectCategory(category);
    transition(RANKER);
  }

  return (
    <main className="container">
      <Header
        setSearch={props.setSearch}
        searchProducts={props.searchProducts}
        searchTerm={props.searchTerm}
        category={props.category}
        categories={props.categories}
        childCategories={props.childCategories}
        childCategory={props.childCategory}
        setMainCategory={props.setMainCategory}
        selectCategory={getProductsByCategory}
        user={props.user}
        setUser={props.setUser}

      />
    {mode === HIDDEN && <></>}
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
      />
    ))}
    </main>
  )
}