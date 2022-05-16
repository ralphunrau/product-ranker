import classNames from 'classnames';
import '../styles/CategoryListItem.scss';

import ChildCategoryListItem from './ChildCategoryListItem';

export default function CategoryListItem(props) {

  const childCategoryListItem = props.childCategories.map((childCategory) => {

    return (
      <ChildCategoryListItem 
        key={childCategory.id}
        id={childCategory.id}
        name={childCategory.name}
        selected={childCategory.id === props.childcategory}
      />
    )
  })

  // className declaration for default, selected, and full state
  const categoryClass = classNames('category-list', {
    'category-list--selected': props.selected
  });

  return (
    <div>
    <li data-testid={'category'} onClick={props.setCategory} className={categoryClass}>
      <h3 className="text--regular">{props.name}</h3>
    </li>
      {props.selected && <ul>{childCategoryListItem}</ul>}
    </div>
  );
}