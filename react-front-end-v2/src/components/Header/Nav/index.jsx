import '../../styles/Nav.scss'

import User from './User';
import Guest from './Guest';

import { HIDDEN, LOGIN, REGISTER, SHOW } from '../../../helper/modes';

import useVisualMode from '../../../hooks/useVisualMode';

export default function Nav(props) {

  const {mode, transition, back} = useVisualMode(HIDDEN);

  const loginForm = () => {
    back();
    props.toggleForm(props.mode === LOGIN ? HIDDEN : LOGIN);
  };

  const registerForm = () => {
    back();
    props.toggleForm(props.mode === REGISTER ? HIDDEN : REGISTER);
  };

  const clickHandler = () => {
    mode === HIDDEN ? transition(SHOW) : back();
  }

  return (
    <nav className="navBar">
      <div className="nav-left">
        <img src="https://i.imgur.com/BM8SFkP.png" alt='logo' />
        <h3>Amazonia</h3>
      </div>
      <div className="nav-right">
        <section className='user-buttons'>
          <img onClick={clickHandler} src='avatar.png' alt='profile' />
          {mode === HIDDEN ? <></> : (
            <>
              {props.user && <User />}
              {!props.user && <Guest onLogin={loginForm} onRegister={registerForm} />}
            </>
          )}
        </section>
      </div>
    </nav>
  );
};