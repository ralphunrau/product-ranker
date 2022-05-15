import './styles/App.scss';

import CategoryList from './CategoryList';
import TierList from './TierList'

export default function Body(props) {
  
  return (
    <main className="container">
      <CategoryList 
        category={props.category}
        categories={props.categories}
        onChange={props.onChange}
      />
      <TierList products={props.products}/>
    </main>
  )
}