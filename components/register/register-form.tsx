import { useRef } from 'react';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import Spacer from '../ui/Spacer';
import Link from 'next/link';

async function registerUser(username: string, password: string) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = response.json();

  if (!response.ok) {
    throw new Error('Error.')
  }

  return data;
}

function RegisterForm(props) {
  const usernameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const result = await registerUser(enteredUsername, enteredPassword);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ marginBlockStart: '7rem', mx: 'auto', maxInlineSize: '512px' }}>
      <Box
        as="form"
        onSubmit={submitHandler}
      >
        <Box>
          <Label htmlFor="username">Username</Label>
          <Input type="text" required id="username" ref={usernameInputRef} />
        </Box>
        <Spacer size={['2rem']} />
        <Box>
          <Label htmlFor="password">Password</Label>
          <Input type="text" required id="password" ref={passwordInputRef} />
        </Box>
        <Spacer size={['2.4rem']} />
        <Box>
          <Button>Register</Button>
        </Box>
      </Box>
      <Spacer size={['2.4rem']} />
      <Link href="/login">
        <a>
          <Text variant='link'>Already have an account? Login</Text>
        </a>
      </Link>
    </Box>
  );
}

export default RegisterForm;
