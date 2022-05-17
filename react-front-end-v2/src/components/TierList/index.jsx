import '../styles/TierList.scss'
import Item from './Item'

export default function TierList(props) {
  // const {mode, transition, back} = useVisualMode(props.user ? USER : GUEST);

  const allProductsToComponents = props.products.map((product) => {
    return (
      <Item 
      image={product.image}
      key={product.asin}
      id={product.asin} 
      link={product.link}
      rating={product.rating} 
      ratings_total={product.ratings_total} 
      title={product.title} 
      />
    )
  })

  const getCategoryName = () => {
    if (props.category) {
      if (props.childCategory) return props.childCategories.find(category => category.id === props.childCategory).name;
      return props.categories.find(category => category.id === props.category).name;
    }
    return 'CATEGORY';
  }

  const sortItemsIntoTierList = (allProducts) => {
    return (
      <div id="tier-list-right">
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4.8 && product.props.rating <= 5)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4.65 && product.props.rating < 4.8)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4.3 && product.props.rating < 4.65)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4 && product.props.rating < 4.3)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 2 && product.props.rating < 4)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 0 && product.props.rating < 2)}
        </div>
      </div>
    )
  };

  return (
    <div id="tier-list">
      <header>
        {getCategoryName()}
      </header>
      <div id="tier-list-body">
        <div id="tier-list-left">
          <div className="tier-list-rank">
            <img src='s-badge.png' alt='s-badge'/>
          </div>
          <div className="tier-list-rank">
            <img src='a-badge.png' alt='a-badge'/>
          </div>
          <div className="tier-list-rank">
            <img src='b-badge.png' alt='b-badge'/>
          </div>
          <div className="tier-list-rank">
            <img src='c-badge.png' alt='c-badge'/>
          </div>
          <div className="tier-list-rank">
            <img src='d-badge.png' alt='d-badge'/>
          </div>
          <div className="tier-list-rank">
            <img src='f-badge.png' alt='f-badge'/>
          </div>
        </div>
        {sortItemsIntoTierList(allProductsToComponents)}
      </div>
      <div id="tier-list-footer">
        <button>
          Add item to favorites
        </button>
        <button>
          Compare items on this tier list
        </button>
      </div>

    </div>
  )
}