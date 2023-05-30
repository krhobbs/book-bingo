import Head from 'next/head';
import LoginForm from '../components/forms/LoginForm';

function Login() {
  return (
    <>
      <Head>
        <title>Book Bingo | Login</title>
      </Head>
      <LoginForm />
    </>
  );
}

export default Login;
