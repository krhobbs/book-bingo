import { useRef } from 'react';
import { Box, Label, Input, Button } from 'theme-ui';
import Spacer from '../ui/Spacer';

function RegisterForm(props) {
  const usernameInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  return (
    <Box
      as="form"
      sx={{ marginBlockStart: '7rem', mx: 'auto', maxInlineSize: '512px' }}
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
  );
}

export default RegisterForm;
