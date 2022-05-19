import '../../styles/Nav.scss'

import User from './User';
import Guest from './Guest';
import SeachBar from '../../SearchBar';

import { HIDDEN, LOGIN, REGISTER, SHOW } from '../../../helper/modes';

import useVisualMode from '../../../hooks/useVisualMode';
import SearchBar from '../../SearchBar';

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

  const searchProducts = () => {
    props.onSearch(props.searchTerm)
  }

  const onLogout = () => {
    back();
    props.signOut();
  }

  return (
    <nav className="navBar">
      <div className="nav-left">
        <img src='https://i.imgur.com/BM8SFkP.png' alt='logo' onClick={props.toggleBar}/>
      </div>
      <div className="nav-search">
        <SearchBar setSearch={props.onChange} searchProducts={searchProducts} searchTerm={props.searchTerm} />
      </div>
      <div className="nav-right">
        <section className='user-buttons'>
          <img onClick={clickHandler} src='avatar.png' alt='profile' />
          {mode === HIDDEN ? <></> : (
            <>
              {props.user.username && <User onLogout={onLogout} user={props.user.username} />}
              {!props.user.username && <Guest onLogin={loginForm} onRegister={registerForm} />}
            </>
          )}
        </section>
      </div>
    </nav>
  );
};