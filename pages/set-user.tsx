import Head from 'next/head';
import SetUsernameForm from '../components/forms/SetUsernameForm';

function SetUsername() {
  return (
    <>
      <Head>
        <title>Book Bingo | Register</title>
      </Head>
      <SetUsernameForm />
    </>
  );
}

export default SetUsername;
