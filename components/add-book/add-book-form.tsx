import { useRef } from 'react';
import { Box, Label, Input, Button } from 'theme-ui';
import Spacer from '../ui/Spacer';

function AddBookForm(props) {
  const titleInputRef = useRef<HTMLInputElement>();
  const authorInputRef = useRef<HTMLInputElement>();

  function submitHandler(event) : void {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;

    const bookData = {
      square: props.square,
      user: props.user,
      title: enteredTitle,
      author: enteredAuthor,
    };

    props.onAddBook(bookData);
  }

  return (
    <Box
      as="form"
      sx={{ marginBlockStart: '7rem', px: ['0.25rem', '0rem'], mx: 'auto', maxInlineSize: '512px' }}
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
      <Spacer size={['2.4rem']} />
      <Box>
        <Button>Add Book</Button>
      </Box>
    </Box>
  );
}

export default AddBookForm;
