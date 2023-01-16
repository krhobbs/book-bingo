import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import Spacer from '../ui/Spacer';
import Link from 'next/link';
import ErrorPopup from '../ui/ErrorPopup';

async function registerUser(username: string, password: string) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

function RegisterForm(props) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const usernameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const result = await registerUser(enteredUsername, enteredPassword);
      setErrorMessage('');
      router.push('/login');
    } catch (error) {
      setErrorMessage(error.message);
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
            <Button>Register</Button>
          </Box>
        </Box>
        <Spacer size={['2.4rem']} />
        <Link href="/login">
          <a>
            <Text variant="link">Already have an account? Login</Text>
          </a>
        </Link>
      </Box>
      {errorMessage && (
        <Box>
          <Spacer size={['2.4rem']} />
          <ErrorPopup
            message={errorMessage}
            close={closeErrorPopup}
            sx={{ margin: 'auto' }}
          ></ErrorPopup>
        </Box>
      )}
    </>
  );
}

export default RegisterForm;
