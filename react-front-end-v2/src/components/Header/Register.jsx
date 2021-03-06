import { useState } from 'react';
import Button from "../Button";

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passowrdConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (username === '') {
      setError('please enter a valid username');
      return;
    }

    if (email === '') {
      setError('please enter a valid email');
      return;
    }

    if (password === '' || passowrdConfirmation === '') {
      setError('please enter your password');
      return;
    }

    if (password === passowrdConfirmation) {
      setError(null);
      props.register(username, email, password)
    } else {
      setError('Your password does not match!');
      return
    }
  }

  return (
    <main className="user-form">
      <h3>Sign Up</h3>
      <section className="form-input">
        <input
          name="username"
          type="text"
          placeholder='Username'
          className="form-input--text"
          onChange={event =>  setUsername(event.target.value)}
          data-testid="user-email"
        />
        <input
          name="email"
          type="email"
          placeholder='Email'
          className="form-input--text"
          onChange={event =>  setEmail(event.target.value)}
          data-testid="user-email"
        />
         <input
          name="password"
          type="password"
          placeholder='Password'
          className="form-input--text"
          onChange={event =>  setPassword(event.target.value)}
          data-testid="user-password"
        />
              <input
          name="passwordConfirmation"
          type="password"
          placeholder='Confirm password'
          className="form-input--text"
          onChange={event =>  setPasswordConfirmation(event.target.value)}
          data-testid="user-password"
        />
      </section>
      <section className="form-submit">
        <Button confirm onClick={validate} >Register</Button>
        <Button confirm onClick={props.cancel} >Cancel</Button>
      </section>
    </main>
  );
};