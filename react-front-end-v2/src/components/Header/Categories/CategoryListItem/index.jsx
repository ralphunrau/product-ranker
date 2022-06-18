import classNames from 'classnames';
import '../../../styles/CategoryListItem.scss';

import ChildCategoryListItem from './ChildCategoryListItem';
import SidebarStatus from '../../../SidebarStatus';

export default function CategoryListItem(props) {

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
        setSearch={props.setSearch}
        searchTerm={props.searchTerm}
      />
    )
  })

  // className declaration for default, selected, and full state
  const categoryClass = classNames('category-list', {
    'category-list--selected': props.selected
  });

  const clickHandler = (category) => {
    props.setMainCategory(category);
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