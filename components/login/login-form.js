import styles from "./login-form.module.scss";
import { useRef } from "react";
import { useRouter } from "next/router";

function LoginForm(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

//   function submitHandler(event) {
//     event.preventDefault();

//     const enteredUsername = usernameInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;

//     const loginData = {
//       username: enteredUsername,
//       password: enteredPassword,
//     };

//     props.onAddBook(loginData);
//   }

  return (
    <form className={styles.form} >
      <div className={styles.control}>
        <label htmlFor="title">Username</label>
        <input type="text" required id="title" ref={usernameInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="author">Password</label>
        <input type="text" required id="author" ref={passwordInputRef} />
      </div>
      <div className={styles.actions}>
        <button>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
