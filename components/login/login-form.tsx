import { useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import { signIn } from 'next-auth/react';
import Spacer from '../ui/Spacer';
import Link from 'next/link';

function LoginForm(props) {
  const router = useRouter();
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
      router.replace('/profile');
    }
  }

  return (
    <Box sx={{ marginBlockStart: '7rem', mx: 'auto', maxInlineSize: '512px' }}>
      <Box as="form" onSubmit={submitHandler}>
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
          <Button>Login</Button>
        </Box>
      </Box>
      <Spacer size={['2.4rem']} />
      <Link href="/register">
        <a>
          <Text variant='link'>Don't have an account? Register</Text>
        </a>
      </Link>
    </Box>
  );
}

export default LoginForm;
