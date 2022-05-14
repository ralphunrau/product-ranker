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
    props.login(email, password)
  }

  return (
    <main className="login-form">
      <section className="form-input">
        <input
          name="email"
          type="text"
          placeholder='Email'
          className="form-input--text"
          onChange={event =>  setEmail(event.target.value)}
          data-testid="user-email"
        />
         <input
          name="password"
          type="text"
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