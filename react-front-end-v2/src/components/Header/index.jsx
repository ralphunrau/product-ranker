import '../styles/Header.scss'

import useVisualMode from '../../hooks/useVisualMode';

import Login from './Login';
import Register from './Register';
import { useEffect } from 'react';

// constants for mode
const HIDDEN = 'HIDDEN';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

export default function Header(props) {
  const {mode, transition, back} = useVisualMode(props.mode);

  useEffect(() => {
    if(props.mode === LOGIN && mode !== LOGIN) transition(LOGIN);
    if(props.mode === REGISTER && mode !== REGISTER) transition(REGISTER);
    if(props.mode === HIDDEN && mode !== HIDDEN) transition(HIDDEN);
  })

  const onCancel = () => {
    back()
  }

  return (
    <header className="header">
      {mode === HIDDEN && <></>}
      {mode === LOGIN && <Login cancel={onCancel}/>}
      {mode === REGISTER && <Register cancel={onCancel}/>}
    </header>
  )
}