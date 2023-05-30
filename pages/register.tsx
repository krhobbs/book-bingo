import Head from 'next/head';
import RegisterForm from '../components/forms/RegisterForm';

function Register() {
  return (
    <>
      <Head>
        <title>Book Bingo | Register</title>
      </Head>
      <RegisterForm />
    </>
  );
}

export default Register;
