import Rating from '@mui/material/Rating';

import '../styles/Label.scss';

export default function Label(props) {

  return (
    <div className="item-label">
      <img src={props.product.image} alt="product"></img>
      <p>{props.product.title.split(' ').slice(0, 4).join(' ').split('-')[0]}</p>
      <div className="product-details-section">
        <Rating name='read-only' value={props.product.rating} precision={0.5} readOnly size="small" />
        ({props.product.ratings_total})
      </div>
      <p>{props.product.price?.raw || "Not Available"}</p>
    </div>
  )
}