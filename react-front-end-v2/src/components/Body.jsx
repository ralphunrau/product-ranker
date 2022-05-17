import './styles/App.scss';

import CategoryList from './Categories';
import TierList from './TierList'
import Status from './Status';

import useVisualMode from '../hooks/useVisualMode';

import {LOADING, SHOW } from '../helper/modes';

export default function Body(props) {
  
  const {mode, transition} = useVisualMode(SHOW);

  const onChange = (category) => {
    transition(LOADING);

    return new Promise((res) => {
      res(props.selectCategory(category))
    })
    .then(transition(SHOW))
    .catch((error) => console.error(error.message));
  };

  return (
    <main className="container">
      <CategoryList 
        category={props.category}
        categories={props.categories}
        childCategories={props.childCategories}
        childCategory={props.childCategory}
        setMainCategory={props.setMainCategory}
        selectCategory={onChange}
      />
      {mode === LOADING && <Status />}
      {mode === SHOW && (
        <TierList
          currentCategory={props.currentCategory}
          products={props.products}
          getProductsByCategory={props.getProductsByCategory}
          category={props.category}
          childCategory={props.childCategory}
        />
      )}
    </main>
  )
}