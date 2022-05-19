import classNames from 'classnames';
import '../../../styles/CategoryListItem.scss';

import ChildCategoryListItem from './ChildCategoryListItem';
import SidebarStatus from '../../../SidebarStatus';

import useVisualMode from '../../../../hooks/useVisualMode';

import { HIDDEN, LOADING } from '../../../../helper/modes'

export default function CategoryListItem(props) {

  const {mode, transition} = useVisualMode(HIDDEN);

  const childCategoryListItem = props.childCategories.map((childCategory) => {
    return (
      <ChildCategoryListItem 
        key={childCategory.id}
        id={childCategory.id}
        name={childCategory.name}
        selected={childCategory.id === props.childCategory}
        childCategories={props.childCategories}
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
    .then(transition(HIDDEN))
    .catch((err) => console.error(err.message));
  };

  return (
    <div>
      <li data-testid={'category'} onClick={() => clickHandler(props.id)} className={categoryClass}>
        <h3 className="text--regular">{props.name} {(props.selected && props.childCategories.length < 1) && <SidebarStatus />}</h3> 
      </li>
      {props.selected && <ul>{childCategoryListItem}</ul>}
    </div>
  );
}