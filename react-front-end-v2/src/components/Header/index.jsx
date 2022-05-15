import '../styles/Header.scss'

import useVisualMode from '../../hooks/useVisualMode';
import Nav from './Nav';

import Login from './Login';
import Register from './Register';

import { HIDDEN, LOGIN, REGISTER } from './helper/modes';

export default function Header(props) {
  const {mode, transition} = useVisualMode(HIDDEN);

  const onCancel = () => {
    transition(HIDDEN)
  }

  const toggleForm = (form) => {
    mode === form ? onCancel() : transition(form)
  }

  return (
    <header className="header">
      <Nav
        toggleForm={toggleForm}
        mode={mode}
      />
      {mode === HIDDEN && <></>}
      {mode === LOGIN && <Login cancel={onCancel}/>}
      {mode === REGISTER && <Register cancel={onCancel}/>}
    </header>
  )
}