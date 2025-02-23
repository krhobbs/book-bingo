import { useState } from 'react';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ErrorPopup, Spacer } from '../ui';

interface AddBookFormValues {
  title: string;
  author: string;
  color?: string;
  cover?: string
}

function AddBookForm({ handleAddBook }: { handleAddBook: Function }) {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm<AddBookFormValues>();

  const onSubmit: SubmitHandler<AddBookFormValues> = async (data) => {
    if (!data.cover.includes('images-na.ssl-images-amazon.com')) {
      data.cover = null;
    }

    const book: Book = {
      title: data.title,
      author: data.author,
      cover: data.cover
    }

    await handleAddBook(book, data.color);
  }

  function closeErrorPopup(): void {
    setErrorMessage('');
  }

  return (
    <Box
      as="form"
      variant='layout.form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Label htmlFor="title">Book Title</Label>
        <Input type="text" required id="title" {...register('title', { required: true })} />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="author">Author</Label>
        <Input type="text" required id="author" {...register('author', { required: true })} />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="cover">Cover (optional)</Label>
        <Input type="url" id="cover" {...register('cover')} />
        <Text as="p" variant="body2" sx={{ mt: '0.1rem' }}>
          Only image urls from goodreads are compatible.
        </Text>
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="color">Color</Label>
        <Input
          type="color"
          id="color"
          {...register('color')}
          defaultValue="#FFFFFF"
          sx={{ padding: '0px', border: 'none' }}
        />
      </Box>
      <Spacer size={['2.4rem']} />
      <Box>
        <Button>Add Book</Button>
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

export default AddBookForm;
