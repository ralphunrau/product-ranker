import '../styles/Nav.scss'


// import hooks
import useVisualMode from '../../hooks/useVisualMode'

import User from './User';
import Guest from './Guest';

// constants for mode
const GUEST = 'GUEST';
const USER = 'USER';

export default function Nav(props) {
  const {mode, transition, back} = useVisualMode(props.user ? USER : GUEST);

  const loginForm = () => {
    props.toggleForm(props.header === "LOGIN" ? "HIDDEN" : "LOGIN")
  };

  const registerForm = () => {
    props.toggleForm(props.header === "REGISTER" ? "HIDDEN" : "REGISTER")
  }

  return (
    <nav className="navBar">
      <div className="nav-left">
        <img src="https://i.imgur.com/BM8SFkP.png" alt='logo' />
        <h3>Amazonia</h3>
      </div>
      <div className="nav-right">
        {mode === USER && <User />}
        {mode === GUEST && <Guest onLogin={loginForm} onRegister={registerForm} />}
      </div>
    </nav>
  )
}