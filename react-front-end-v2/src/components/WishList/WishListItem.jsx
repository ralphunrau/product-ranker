import Rating from '@mui/material/Rating';
import Button from "../Button";

export default function WishListItem(props) {

  return (
    <article className="wish-list-item">
      <div className="product-info">
          <h4><b>{props.position}</b></h4>
          <img src={props.image} alt="product-item" />
        <div className="product-details">
          <h3>{props.title}</h3>
            <div className="product-rating">
              <Rating name='read-only' value={props.rating} precision={0.5} readOnly size='small'/>
              ({props.ratings_total})
            </div>
          {props.price}      
        </div>
      </div>
      <div className="item-buttons">        
        {props.edit === false && <a href={props.link} target="_blank" rel="noreferrer"> <Button confirm>Visit Product</Button></a>}
        <Button danger onClick={props.removeWish} >Remove</Button>
      </div>
    </article>
  )
}