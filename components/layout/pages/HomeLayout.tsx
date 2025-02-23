import Head from 'next/head';
import { LoginButton, Spacer } from '../../ui';
import { Text } from 'theme-ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function HomeLayout() {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Book Bingo</title>
      </Head>
      <Text as="h1" variant="heading1" sx={{ textAlign: 'center' }}>
        Book Bingo
      </Text>
      <Text
        as="p"
        variant="body1"
        sx={{
          textAlign: 'center',
          maxInlineSize: '800px',
          mx: 'auto',
          px: ['1rem', '3rem'],
        }}
      >
        A web app for playing Book Bingo. You must sign in with Reddit to save
        your cards. You can create new cards from the /templates page or the
        /profile page. You can archive and delete cards from the /settings page.
        You can also view archived cards or add and delete friends for the
        /settings page.
      </Text>
      {status === 'unauthenticated' &&
        <>
          <Spacer size="2rem" />
          <LoginButton provider="google" sx={{ display: 'block', mx: 'auto' }} />
          <Spacer size="2rem" />
          <LoginButton provider="reddit" sx={{ display: 'block', mx: 'auto' }} />
        </>
      }
    </>
  );
}

export default HomeLayout;
