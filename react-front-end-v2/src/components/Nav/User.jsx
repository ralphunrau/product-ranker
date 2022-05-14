import classNames from "classnames";

import Button from "../Button";

export default function User(props) {

  const userButtonClass = classNames('user-button', {
    'user-button-hidden': props.hidden,
    'user-button-show': !props.hidden
  });

  return (
    <div className={userButtonClass}>
      <Button danger onClick={props.onLogout}>Logout</Button>
    </div>
  );
};