import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import ErrorPopup from '../ui/ErrorPopup';
import Spacer from '../ui/Spacer';
import { useRouter } from 'next/router';
import { createTemplate } from '../../utils/api-utils';

function CreateTemplateForm() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function onSubmit(data: string[]) {
    let reqs = Object.values(data);
    const name = reqs.shift();

    const response = await createTemplate(name, reqs);

    if (response.ok) {
      router.push('/templates');
    } else {
      setErrorMessage('Failed to create new template.');
    }
  }

  function closeErrorPopup(): void {
    setErrorMessage('');
  }

  return (
    <Box
      as="form"
      sx={{
        marginBlockStart: '7rem',
        px: ['0.25rem', '0rem'],
        mx: 'auto',
        maxInlineSize: '512px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label htmlFor="name" variant="text.heading2">Name</Label>
      <Input
        type="text"
        id="name"
        {...register('name', { required: true })}
      />
      <Spacer size="1rem" />
      {/* Row 1 */}
      <Text as="h2" variant="heading2">
        Row 1
      </Text>
      <Spacer size="0.4rem" />
      <Box>
        <Label htmlFor="square 1A">Square 1</Label>
        <Input
          type="text"
          id="square 1A"
          {...register('square1A', { required: true })}
        />
      </Box>
      <Spacer size="0.3rem" />
      <Box>
        <Label htmlFor="square 1B">Square 2</Label>
        <Input
          type="text"
          id="square 1B"
          {...register('square1B', { required: true })}
        />
      </Box>
      <Spacer size="0.3rem" />
      <Box>
        <Label htmlFor="square 1C">Square 3</Label>
        <Input
          type="text"
          id="square 1C"
          {...register('square1C', { required: true })}
        />
      </Box>
      <Spacer size="0.3rem" />
      <Box>
        <Label htmlFor="square 1D">Square 4</Label>
        <Input
          type="text"
          id="square 1D"
          {...register('square1D', { required: true })}
        />
      </Box>
      <Spacer size="0.3rem" />
      <Box>
        <Label htmlFor="square 1E">Square 5</Label>
        <Input
          type="text"
          id="square 1E"
          {...register('square1E', { required: true })}
        />
      </Box>
      <Spacer size={['1.25rem']} />
      {/* Row 2 */}
      <Text variant="heading2">Row 2</Text>
      <Box>
        <Label htmlFor="square 2A">Square 1</Label>
        <Input
          type="text"
          id="square 2A"
          {...register('square2A', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 2B">Square 2</Label>
        <Input
          type="text"
          id="square 2B"
          {...register('square2B', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 2C">Square 3</Label>
        <Input
          type="text"
          id="square 2C"
          {...register('square2C', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 2D">Square 4</Label>
        <Input
          type="text"
          id="square 2D"
          {...register('square2D', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 2E">Square 5</Label>
        <Input
          type="text"
          id="square 2E"
          {...register('square2E', { required: true })}
        />
      </Box>
      <Spacer size={['1.25rem']} />
      {/* Row 3 */}
      <Text variant="heading2">Row 3</Text>
      <Box>
        <Label htmlFor="square 3A">Square 1</Label>
        <Input
          type="text"
          id="square 3A"
          {...register('square3A', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 3B">Square 2</Label>
        <Input
          type="text"
          id="square 3B"
          {...register('square3B', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 3C">Square 3</Label>
        <Input
          type="text"
          id="square 3C"
          {...register('square3C', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 3D">Square 4</Label>
        <Input
          type="text"
          id="square 3D"
          {...register('square3D', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 3E">Square 5</Label>
        <Input
          type="text"
          id="square 3E"
          {...register('square3E', { required: true })}
        />
      </Box>
      <Spacer size={['1.25rem']} />
      {/* Row 4 */}
      <Text variant="heading2">Row 4</Text>
      <Box>
        <Label htmlFor="square 4A">Square 1</Label>
        <Input
          type="text"
          id="square 4A"
          {...register('square4A', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 4B">Square 2</Label>
        <Input
          type="text"
          id="square 4B"
          {...register('square4B', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 4C">Square 3</Label>
        <Input
          type="text"
          id="square 4C"
          {...register('square4C', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 4D">Square 4</Label>
        <Input
          type="text"
          id="square 4D"
          {...register('square4D', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 4E">Square 5</Label>
        <Input
          type="text"
          id="square 4E"
          {...register('square4E', { required: true })}
        />
      </Box>
      <Spacer size={['1.25rem']} />
      {/* Row 5 */}
      <Text variant="heading2">Row 5</Text>
      <Box>
        <Label htmlFor="square 5A">Square 1</Label>
        <Input
          type="text"
          id="square 5A"
          {...register('square5A', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 5B">Square 2</Label>
        <Input
          type="text"
          id="square 5B"
          {...register('square5B', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 5C">Square 3</Label>
        <Input
          type="text"
          id="square 5C"
          {...register('square5C', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 5D">Square 4</Label>
        <Input
          type="text"
          id="square 5D"
          {...register('square5D', { required: true })}
        />
      </Box>
      <Box>
        <Label htmlFor="square 5E">Square 5</Label>
        <Input
          type="text"
          id="square 5E"
          {...register('square5E', { required: true })}
        />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Button>Create Template</Button>
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
    </Box>
  );
}

export default CreateTemplateForm;
