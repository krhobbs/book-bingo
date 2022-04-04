import styles from "./add-book-form.module.scss";
import { useRef } from "react";
import { useRouter } from "next/router";

function AddBookForm(props) {
  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const imageInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredImage = imageInputRef.current.value;

    const bookData = {
      square: props.square,
      user: props.user,
      title: enteredTitle,
      author: enteredAuthor,
      image: enteredImage,
    };

    props.onAddBook(bookData);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Book Title</label>
        <input type="text" required id="title" ref={titleInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="author">Author</label>
        <input type="text" required id="author" ref={authorInputRef} />
      </div>
      {/* <div className={styles.control}>
        <label htmlFor="author">Book Cover</label>
        <input type="url" required id="image" ref={imageInputRef} />
      </div> */}
      <div className={styles.actions}>
        <button>Add Book</button>
      </div>
    </form>
  );
}

export default AddBookForm;
