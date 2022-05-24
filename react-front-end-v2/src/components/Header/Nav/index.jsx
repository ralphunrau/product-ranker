import ClickAwayListener from '@mui/material/ClickAwayListener';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import '../../styles/Nav.scss'

import User from './User';
import Guest from './Guest';
import SearchBar from '../../SearchBar';

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

  const searchProducts = () => {
    props.onSearch(props.searchTerm)
  }

  const onLogout = () => {
    back();
    props.signOut();
  }

  const handleClickAway = () => {
    transition(HIDDEN);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <nav className="navBar">
        <div className="nav-left">
          <img src='logo.png' alt='logo' onClick={props.toggleBar}/>
        </div>
        <div className="nav-search">
          <SearchBar setSearch={props.onChange} searchProducts={searchProducts} searchTerm={props.searchTerm} />
        </div>
        <div className="nav-right">
          <section className='user-buttons'>
            {props.user && <div onClick={props.getWishes}><FontAwesomeIcon icon={faList} className="wish-list-button" /></div>}
            <img onClick={clickHandler} src='avatar.png' alt='profile' />
            {mode === HIDDEN ? <></> : (
              <>
                {props.user && <User onLogout={onLogout} user={props.user.username} />}
                {!props.user && <Guest onLogin={loginForm} onRegister={registerForm} />}
              </>
            )}
          </section>
        </div>
      </nav>
    </ClickAwayListener>
  );
};