import { useSession } from 'next-auth/react';
import Template from './template/Template';
import { Flex, Spinner, Text } from 'theme-ui';
import Link from 'next/link';

function Templates({ templates } : { templates: Template[] }) {
  const { data: session, status } = useSession();

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
  return (
    <Flex sx={{flexDirection: 'column', gap: '3rem'}}>
      {templates.map((template: Template) => {
        return <Template template={template}/>;
      })}
    </Flex>
  );
}

export default Templates;
