import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import CreateTemplateForm from '../../forms/CreateTemplateForm';

function CreateTemplateLayout() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  async function addBookHandler(enteredTemplateData) {
    const response = await fetch(`/api/template/new`, {
      method: 'POST',
      body: JSON.stringify(enteredTemplateData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      router.back();
      return 'success';
    } else {
      return data.message;
    }
  }

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
