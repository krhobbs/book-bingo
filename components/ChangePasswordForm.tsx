import { useRef } from 'react';
import { Box, Label, Input, Button } from 'theme-ui';
import Spacer from './ui/Spacer';

function AddBookForm(props) {
  const oldPasswordRef = useRef<HTMLInputElement>();
  const newPasswordRef = useRef<HTMLInputElement>();

  function submitHandler(event) : void {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

  }

  return (
    <Box
      as="form"
      sx={{ mx: 'auto', px: ['0.25rem', '0rem'], maxInlineSize: '512px' }}
      onSubmit={submitHandler}
    >
      <Box>
        <Label htmlFor="old-password">Old Password</Label>
        <Input type="text" required id="old-password" ref={oldPasswordRef} />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="new-password">New Password</Label>
        <Input type="text" required id="new-password" ref={newPasswordRef} />
      </Box>
      <Spacer size={['2.4rem']} />
      <Box>
        <Button>Change Password</Button>
      </Box>
    </Box>
  );
}

export default AddBookForm;
