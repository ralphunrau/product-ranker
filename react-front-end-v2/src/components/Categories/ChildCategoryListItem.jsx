import classNames from 'classnames';
import '../styles/ChildCategoryListItem.scss';

export default function ChildCategoryListItem(props) {

  // className declaration for default, selected, and full state
  const childCategoryClass = classNames('child-list', {
    'child-list--selected': props.selected
  });

  return (
    <li data-testid={'childCategory'} onClick={props.setCategory} className={childCategoryClass}>
      <h4 className="text--regular">{props.name}</h4>
    </li>
  );
}