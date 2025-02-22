import { Button, ThemeUICSSObject } from 'theme-ui';
import { signIn } from 'next-auth/react';

export function LoginButton({ provider, sx }: { provider: ValidProviders, sx?: ThemeUICSSObject }) {
  return (
    <Button
      sx={{ ...sx }}
      onClick={() => {
        signIn(provider, { callbackUrl: '/profile' });
      }}
    >
      Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );
}

