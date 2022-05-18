import './styles/App.scss';

import TierList from './TierList'
import Status from './Status';
import Header from './Header';

export default function Body(props) {

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
        selectCategory={props.selectCategory}
      />
    
    {props.products.length < 1 ? <Status /> : (
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