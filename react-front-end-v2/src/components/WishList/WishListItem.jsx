
export default function WishListItem(props) {

  return (
    <article className="wish-list-item">
      <div className="product-info">
        <img src={props.image} alt="product-item" />
        <h4>{props.title}</h4>
        <span>{props.rating} ({props.ratings_total})</span>
      </div>
      <div className="product-data">
        THIS IS THE PRODUCT INFORMATIONS
      </div>
    </article>
  )
}