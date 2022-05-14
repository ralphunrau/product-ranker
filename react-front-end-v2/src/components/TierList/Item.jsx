import '../styles/TierList.scss'

export default function Item(props) {

  return (
    <a href={props.link}>
    <img src={props.image} ></img>
    </a>
  );
}
