import '../styles/TierList.scss'
import ItemPopup from './ItemPopup'
import useVisualMode from '../../hooks/useVisualMode';
import { HIDDEN, SHOW } from '../../helper/modes';


export default function Item(props) {
  const {mode, transition, back} = useVisualMode(HIDDEN);

  const clickHandler = () => {
    mode === HIDDEN ? transition(SHOW) : transition(HIDDEN);
  }

  return (
    <img class="item" src={props.image} href={props.link}></img>
  );
}



// props.changeCurrentItem(event.target.src)

{/* <div>
{mode === HIDDEN ? <img src={props.image} onClick={clickHandler}></img> : (
  <>
    {<ItemPopup 
    onClick={clickHandler}
    title={props.title}
    link={props.link}
    image={props.image}
    price={props.price}
    props={props.rating}
    />}
  </>
)}
</div> */}