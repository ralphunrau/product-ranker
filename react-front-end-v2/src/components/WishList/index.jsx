import '../styles/WishList.scss';

import Edit from './Edit';
import Show from './Show';

import useVisualMode from '../../hooks/useVisualMode';
import { EDIT, SHOW } from '../../helper/modes';




export default function WishList(props) {  
  const {mode, transition} = useVisualMode(SHOW);

  const saveWishList = (list) => {
    props.onSave(list);
    transition(SHOW);
  };

  const editWishList = () => {
    transition(EDIT);
  }

  return (
    <>
      {mode === EDIT && (
        <Edit
          products={props.products}
          onSave={saveWishList}
          user={props.user}
          wishes={props.wishes}
          removeWish={props.removeWish}
        />
      )}
      {mode === SHOW && (
        <Show
          products={props.products}
          onEdit={editWishList}
          user={props.user}
          wishes={props.wishes}
          removeWish={props.removeWish}
        />
      )}
    </>
  )
}