import './styles/App.scss';

import CategoryList from './Categories';
import TierList from './TierList'

export default function Body(props) {
  
  return (
    <main className="container">
      <CategoryList 
        category={props.category}
        categories={props.categories}
        childCategories={props.childCategories}
        childCategory={props.childCategory}
        onChange={props.onChange}
      />
      <TierList
        currentCategory={props.currentCategory}
        products={props.products}
        onChange={props.onChange}
        category={props.category}
      />
    </main>
  )
}