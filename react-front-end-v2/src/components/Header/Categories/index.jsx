import Show from './Show';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


export default function CategoryList(props) {

  return (
    <div className='categories'>
      <Show
        category={props.category}
        categories={props.categories}
        childCategories={props.childCategories}
        childCategory={props.childCategory}
        setMainCategory={props.setMainCategory}
        selectCategory={props.selectCategory}
        searchTerm={props.searchTerm}
        setSearch={props.setSearch}
      />
      <section className="side-bar--button" onClick={props.toggleBar}>
        <FontAwesomeIcon icon={faClose} />
      </section>
    </div>
  )
}