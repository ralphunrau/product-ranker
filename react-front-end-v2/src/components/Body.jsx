import './styles/App.scss';

import CategoryList from './Header/Categories';
import TierList from './TierList'
import Status from './Status';

import useVisualMode from '../hooks/useVisualMode';

import {LOADING, SHOW } from '../helper/modes';

export default function Body(props) {
  
  const {mode, transition} = useVisualMode(SHOW);

  

  return (
    <main className="container">

      {mode === LOADING && <Status />}
      {mode === SHOW && (
        <TierList
          currentCategory={props.currentCategory}
          products={props.products}
          getProductsByCategory={props.getProductsByCategory}
          categories={props.categories}
          category={props.category}
          childCategory={props.childCategory}
          childCategories={props.childCategories}
        />
      )}
    </main>
  )
}