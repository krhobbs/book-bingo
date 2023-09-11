import { useRef, useState } from 'react';
import { Box, Label, Input, Button } from 'theme-ui';
import ErrorPopup from '../ui/ErrorPopup';
import Spacer from '../ui/Spacer';

function ChangePasswordForm({ handleChangePassword }) {
  const [errorMessage, setErrorMessage] = useState('');
  const oldPasswordRef = useRef<HTMLInputElement>();
  const newPasswordRef = useRef<HTMLInputElement>();

  async function onChangePassword(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    const result = await handleChangePassword({oldPassword: enteredOldPassword, newPassword: enteredNewPassword})

    if (result !== 'success') {
      setErrorMessage(result);
    } else {
      event.target.reset();
      setErrorMessage('');
    }

  }

  function closeErrorPopup() : void {
    setErrorMessage('');
  }

  return (
    <Box
      as="form"
      sx={{ mx: 'auto', px: ['0.25rem', '0rem'], maxInlineSize: '512px' }}
      onSubmit={onChangePassword}
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
      {errorMessage && <Box>
        <ErrorPopup message={errorMessage} close={closeErrorPopup} sx={{margin: 'auto'}}></ErrorPopup>
        <Spacer size={['2.4rem']} />
      </Box>}
      <Box>
        <Button>Change Password</Button>
      </Box>
    </Box>
  );
}

export default ChangePasswordForm;
