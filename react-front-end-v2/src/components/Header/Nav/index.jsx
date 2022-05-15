import '../../styles/Nav.scss'

import User from './User';
import Guest from './Guest';

import { HIDDEN, LOGIN, REGISTER } from '../helper/modes';

export default function Nav(props) {

  const loginForm = () => {
    props.toggleForm(props.mode === LOGIN ? HIDDEN : LOGIN);
  };

  const registerForm = () => {
    props.toggleForm(props.mode === REGISTER ? HIDDEN : REGISTER);
  };

  return (
    <nav className="navBar">
      <div className="nav-left">
        <img src="https://i.imgur.com/BM8SFkP.png" alt='logo' />
        <h3>Amazonia</h3>
      </div>
      <div className="nav-right">
        {props.user && <User />}
        {!props.user && <Guest onLogin={loginForm} onRegister={registerForm} />}
      </div>
    </nav>
  );
};