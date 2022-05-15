import classNames from 'classnames';
import '../styles/categoryListItem.scss';

export default function CategoryListItem(props) {

  // className declaration for default, selected, and full state
  const categoryClass = classNames('category-list', {
    'category-list--selected': props.selected
  });

  return (
    <li data-testid={'category'} onClick={props.setCategory} className={categoryClass}>
      <h3 className="text--regular">{props.name}</h3>
    </li>
  );
}