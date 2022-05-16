import classNames from 'classnames';
import '../../styles/ChildCategoryListItem.scss';

export default function ChildCategoryListItem(props) {

  // className declaration for default, selected, and full state
  const childCategoryClass = classNames('child-list', {
    'child-list--selected': props.selected
  });

  const clickHandler = () => {
    props.childCategory === props.id ? props.onChange(null) : props.onChange(props.id);
  };

  return (
    <li data-testid={'childCategory'} onClick={clickHandler} className={childCategoryClass}>
      <h4 className="text--regular">{props.name}</h4>
    </li>
  );
}