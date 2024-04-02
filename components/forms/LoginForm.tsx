import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import { signIn } from 'next-auth/react';
import Spacer from '../ui/Spacer';
import Link from 'next/link';
import ErrorPopup from '../ui/ErrorPopup';

function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const usernameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn('credentials', {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });

    if (!result.error) {
      setErrorMessage('');
      router.replace('/profile');
    } else {
      setErrorMessage(result.error);
    }
  }

  function closeErrorPopup(): void {
    setErrorMessage('');
  }

  return (
    <>
      <Box
        sx={{ marginBlockStart: '7rem', mx: 'auto', maxInlineSize: '512px' }}
      >
        <Box as="form" onSubmit={submitHandler}>
          <Box>
            <Label htmlFor="username">Username</Label>
            <Input type="text" required id="username" ref={usernameInputRef} />
          </Box>
          <Spacer size={['2rem']} />
          <Box>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
            />
          </Box>
          <Spacer size={['2.4rem']} />
          <Box>
            <Button>Login</Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ mx: 'auto', maxInlineSize: '512px' }}
      >
        <Spacer size={['1.4rem']} />
        <Text>OR</Text>
        <Spacer size={['1.4rem']} />
        <Button onClick={() => {signIn('google')}}>Sign in with Google</Button>
        <Spacer size={['2.4rem']} />
        <Link href="/register">
          <Text variant="link">Don&apos;t have an account? Register</Text>
        </Link>
      </Box>
      {errorMessage && (
        <Box>
          <Spacer size={['2.4rem']} />
          <ErrorPopup
            message={errorMessage}
            close={closeErrorPopup}
            sx={{ margin: '1rem', left: '0px', right: '0px' }}
          ></ErrorPopup>
        </Box>
      )}
    </>
  );
}

export default LoginForm;
