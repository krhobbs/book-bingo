import Head from 'next/head';
import CreateTemplateForm from '../../forms/CreateTemplateForm';

function CreateTemplateLayout() {
  return (
    <>
      <Head>
        <title>Book Bingo | Add New Book</title>
      </Head>
      <CreateTemplateForm />
    </>
  );
}

export default CreateTemplateLayout;
