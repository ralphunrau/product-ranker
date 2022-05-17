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

module.exports = sortItemsIntoTierList;