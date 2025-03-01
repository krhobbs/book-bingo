import { useState } from 'react';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import { ErrorPopup, Spacer } from '../ui';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface EditBookFormValues {
  title: string;
  author: string;
  color?: string;
  cover?: string
}

function EditBookForm({
  square,
  handleEditBook,
}: {
  square: Square;
  handleEditBook: (book: Book, color: string) => Promise<void>;
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm<EditBookFormValues>();

  const onSubmit: SubmitHandler<EditBookFormValues> = async (data) => {
    if (data?.cover?.includes('images-na.ssl-images-amazon.com')) {
      data.cover = undefined;
    }

    const book: Book = {
      title: data.title,
      author: data.author,
      cover: data?.cover,
    };

    try {
      await handleEditBook(book, data?.color || '#FFFFFF');
    } catch (error) {
      setErrorMessage('Error editing book.')
    }
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
        <Input
          type="text"
          required
          id="title"
          {...register('title')}
          defaultValue={square?.book?.title || ''}
        />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          required
          id="author"
          {...register('author')}
          defaultValue={square?.book?.author || ''}
        />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="cover">Cover (optional)</Label>
        <Input
          type="url"
          id="cover"
          {...register('cover')}
          defaultValue={square?.book?.cover ?? ''}
        />
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
          defaultValue={square.color}
          sx={{ padding: '0px', border: 'none' }}
        />
      </Box>
      <Spacer size={['2.4rem']} />
      <Button>Save</Button>
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

export default EditBookForm;
