import { Button, ThemeUICSSObject } from 'theme-ui';
import { signIn } from 'next-auth/react';

function LoginButton({ sx } : { sx?: ThemeUICSSObject }) {
  return (
    <Button sx={{...sx}} onClick={() => {signIn('reddit', { callbackUrl: '/profile' })}}>
      Sign in with Reddit
    </Button>
  );
}

export default LoginButton;
