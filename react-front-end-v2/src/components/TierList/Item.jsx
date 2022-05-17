import '../styles/TierList.scss'

export default function Item(props) {

  return (
    <div onClick={props.onSelect} className="product-item">
    <img src={props.image} alt="product" />
    </div>
  );
}
