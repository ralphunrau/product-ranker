import classNames from 'classnames';
import '../../styles/CategoryListItem.scss';

import ChildCategoryListItem from './ChildCategoryListItem';
import Status from '../../Status';

import useVisualMode from '../../../hooks/useVisualMode';

const HIDDEN = 'HIDDEN';
const LOADING = 'LOADING';

export default function CategoryListItem(props) {

  const {mode, transition} = useVisualMode(HIDDEN);

  const childCategoryListItem = props.childCategories.map((childCategory) => {
    return (
      <ChildCategoryListItem 
        key={childCategory.id}
        id={childCategory.id}
        name={childCategory.name}
        selected={childCategory.id === props.childCategory}
        childCategory={props.childCategory}
        onChange={props.selectCategory}
      />
    )
  })

  // className declaration for default, selected, and full state
  const categoryClass = classNames('category-list', {
    'category-list--selected': props.selected
  });

  const clickHandler = (category) => {
    if (!props.selected) transition(LOADING);

    new Promise((res) => {
      res(props.setMainCategory(category))
    })
    .then(() => {
      setTimeout(() => {transition(HIDDEN)}, 500)
    })
    .catch((error) => console.error(error.message));
  };

  return (
    <div>
      <li data-testid={'category'} onClick={() => clickHandler(props.id)} className={categoryClass}>
        <h3 className="text--regular">{props.name} {mode === LOADING && <Status />}{mode === HIDDEN && <></>}</h3> 
      </li>
      {props.selected && <ul>{childCategoryListItem}</ul>}
    </div>
  );
}