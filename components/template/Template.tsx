import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Spinner, Text } from 'theme-ui';

function Template() {
  const { data: session, status, update } = useSession();

  if (status === 'unauthenticated') {
    return (
      <Link href="/login">
        <Text
          as="p"
          variant="heading2"
          sx={{ display: 'block', textAlign: 'center', mx: 'auto' }}
        >
          Login
        </Text>
      </Link>
    );
  }

  if (status === 'loading') {
    return <Spinner sx={{ display: 'block', marginInline: 'auto' }} />;
  }

  return <p>Template</p>;
}

export default Template;
