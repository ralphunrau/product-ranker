import '../styles/TierList.scss'
import Item from './Item'

// import hooks
import useVisualMode from '../../hooks/useVisualMode'
import useApplicationData from '../../hooks/useApplicationData'


// constants for mode


export default function TierList(props) {
  // const {mode, transition, back} = useVisualMode(props.user ? USER : GUEST);
  const state = useApplicationData();

  const visitProduct = () => {
    // The code to visit a product page will go here
  }
  
  const sortItemsIntoTierList = (allProducts) => {

    return (
      <div id="tier-list-right">
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4.8 && product.props.rating <= 5)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4.5 && product.props.rating < 4.8)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 4 && product.props.rating < 4.5)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 3 && product.props.rating < 4)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 2 && product.props.rating < 3)}
        </div>
        <div className="tier-list-item">
          {allProducts.filter(product => product.props.rating >= 0 && product.props.rating < 2)}
        </div>
      </div>
    )
  }

  // <div className="tier-list-item-S">
  //   {allProductsToComponents}
  // </div>
  // <div className="tier-list-item-A">
  //   Products will be appended here upon page load.
  // </div>
  // <div className="tier-list-item-B">
  //   Products will be appended here upon page load.
  // </div>
  // <div className="tier-list-item-C">
  //   Products will be appended here upon page load.
  // </div>
  // <div className="tier-list-item-D">
  //   Products will be appended here upon page load.
  // </div>
  // <div className="tier-list-item-F">
  //   Products will be appended here upon page load.
  // </div>

  // const products = props.findProducts;
  // console.log('Products:', props.products);

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

  const fakeImage = 'https://www.gannett-cdn.com/presto/2021/10/06/USAT/002fd519-2817-4df5-b8bc-df6a9d2021d5-Wendys_cereal_box_3D.png'

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