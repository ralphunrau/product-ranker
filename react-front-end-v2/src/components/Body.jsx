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
        setMainCategory={props.setMainCategory}
        selectCategory={props.selectCategory}
      />
      <TierList
        currentCategory={props.currentCategory}
        products={props.products}
        getProductsByCategory={props.getProductsByCategory}
        category={props.category}
        childCategory={props.childCategory}
        changeCurrentItem={props.changeCurrentItem}
        currentItem={props.currentItem}
      />
    </main>
  )
}