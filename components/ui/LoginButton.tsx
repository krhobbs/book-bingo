import { Button } from 'theme-ui';
import { signIn } from 'next-auth/react';

function LoginButton() {
  return (
    <Button onClick={() => {signIn('reddit', { callbackUrl: '/profile' })}}>
      Sign in with Reddit
    </Button>
  );
}

export default LoginButton;
