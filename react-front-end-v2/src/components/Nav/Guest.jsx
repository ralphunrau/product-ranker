import Button from "../Button"

export default function Guest(props) {

  return (
    <div className="user-button">
      <Button confirm onClick={props.onLogin}>Sign In</Button>
      <Button confirm onClick={props.onRegister}>Sign Up</Button>
    </div>
  );
};