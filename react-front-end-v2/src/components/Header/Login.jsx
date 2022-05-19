import { useState } from 'react';
import Button from "../Button";

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (email === '') {
      setError('please enter your email');
      return;
    }

    if (password === '') {
      setError('please enter your password');
      return;
    }

    setError(null);
    const input = {
      email: email,
      password: password
    };

    props.onLogin(input);
  }

  return (
    <main className="user-form">
      <h3>Sign In</h3>
      <section className="form-input">
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
      </section>
      <section className="form-submit">
        <Button confirm onClick={validate} >Login</Button>
        <Button confirm onClick={props.cancel} >Cancel</Button>
      </section>
    </main>
  );
};