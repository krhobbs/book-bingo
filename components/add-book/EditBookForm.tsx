import { useRef, useState } from 'react';
import { Box, Label, Input, Button } from 'theme-ui';
import ErrorPopup from '../ui/ErrorPopup';
import Spacer from '../ui/Spacer';

function EditBookForm(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const titleInputRef = useRef<HTMLInputElement>();
  const authorInputRef = useRef<HTMLInputElement>();
  const colorInputRef = useRef<HTMLInputElement>();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredColor = colorInputRef.current.value;

    const bookData = {
      card: props.card,
      square: props.square,
      title: enteredTitle,
      author: enteredAuthor,
      color: enteredColor,
    };

    const result = await props.onAddBook(bookData);

    if (result !== 'success') {
      setErrorMessage(result);
    } else {
      setErrorMessage('');
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
      onSubmit={submitHandler}
    >
      <Box>
        <Label htmlFor="title">Book Title</Label>
        <Input type="text" required id="title" ref={titleInputRef} />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="author">Author</Label>
        <Input type="text" required id="author" ref={authorInputRef} />
      </Box>
      <Spacer size={['2rem']} />
      <Box>
        <Label htmlFor="color">Color</Label>
        <Input
          type="color"
          id="color"
          ref={colorInputRef}
          defaultValue="#FFFFFF"
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
