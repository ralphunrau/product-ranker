import Show from './Show';

import useVisualMode from '../../hooks/useVisualMode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose  } from '@fortawesome/free-solid-svg-icons';

import {HIDDEN, SHOW} from '../../helper/modes'


export default function CategoryList(props) {

  const {mode, transition} = useVisualMode(HIDDEN);

  const toggleBar = () => {
    transition(mode === HIDDEN ? SHOW : HIDDEN);
  };

  return (
    <div className='categories'>
      {mode === HIDDEN && <></>}
      {mode === SHOW && 
      <Show
        category={props.category}
        categories={props.categories}
        childCategories={props.childCategories}
        childCategory={props.childCategory}
        setMainCategory={props.setMainCategory}
        selectCategory={props.selectCategory}
      />
      }
      <section className="side-bar--button" onClick={toggleBar}>
        {mode === HIDDEN && <FontAwesomeIcon icon={faBars} />}
        {mode === SHOW && <FontAwesomeIcon icon={faClose} />}
      </section>
    </div>
  )
}