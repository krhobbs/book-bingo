import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Box, Label, Input, Button } from 'theme-ui';
import Spacer from '../ui/Spacer';
import ErrorPopup from '../ui/ErrorPopup';

async function registerUser(username: string, email: string) {
  const response = await fetch('/api/auth/set-user', {
    method: 'POST',
    body: JSON.stringify({ username, email }),
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

function SetUsernameForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { data: session } = useSession();

  async function onSubmit({ username }: { username: string }) {
    try {
        await registerUser(username, session.user.email);
        setErrorMessage('');
        router.push('/profile');
    } catch(error) {
        setErrorMessage(error.message);
    }
    
  }

  return (
    <>
      <Box
        sx={{ marginBlockStart: '7rem', mx: 'auto', maxInlineSize: '512px' }}
      >
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" {...register("username", { required: true })} />
          </Box>
          <Spacer size={['2.4rem']} />
          <Box>
            <Button>Set Username</Button>
          </Box>
        </Box>
      </Box>
      {errorMessage && (
        <Box>
          <Spacer size={['2.4rem']} />
          <ErrorPopup
            message={errorMessage}
            close={() => {setErrorMessage('')}}
            sx={{ margin: 'auto' }}
          ></ErrorPopup>
        </Box>
      )}
    </>
  );
}

export default SetUsernameForm;
