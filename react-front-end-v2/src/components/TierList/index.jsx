import '../styles/TierList.scss'
import Item from './Item'

export default function TierList(props) {
  // const {mode, transition, back} = useVisualMode(props.user ? USER : GUEST);

  const allProductsToComponents = props.products.map((product) => {
    return (
      <Item 
      image={product.image} 
      id={product.asin} 
      link={product.link}
      rating={product.rating} 
      ratings_total={product.ratings_total} 
      title={product.title} 
      />
    )
  })

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
        This is the category of the tier list.
      </header>
      <div id="tier-list-body">
        <div id="tier-list-left">
          <div className="tier-list-rank">
            S Tier
          </div>
          <div className="tier-list-rank">
            A Tier
          </div>
          <div className="tier-list-rank">
            B Tier
          </div>
          <div className="tier-list-rank">
            C Tier
          </div>
          <div className="tier-list-rank">
            D Tier
          </div>
          <div className="tier-list-rank">
            F Tier
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