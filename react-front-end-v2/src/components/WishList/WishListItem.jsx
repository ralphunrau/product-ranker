import { SET_PRODUCTS } from "../../reducers/app";
import Button from "../Button";

export default function WishListItem(props) {

  return (
    <article className="wish-list-item">
      <div className="product-info">
        <img src={props.image} alt="product-item" />
        <h4>{props.title}</h4>
        <p>{props.rating} ({props.ratings_total})</p>
        <p>{props.price}</p>
        <a href={props.link} target="_blank" rel="noreferrer"><span>See in Amazon!</span></a>
        <Button onClick={props.removeWish} >Remove</Button>
      </div>
      <div className="product-data">
        THIS IS THE PRODUCT INFORMATIONS
      </div>
    </article>
  )
}