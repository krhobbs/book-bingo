import { useSession } from 'next-auth/react';
import Template from './template/Template';
import LoginButton from './ui/LoginButton';
import { Flex, Spinner } from 'theme-ui';

function Templates({ templates } : { templates: Template[] }) {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return (
      <LoginButton />
    );
  }

  if (status === 'loading') {
    return <Spinner sx={{ display: 'block', marginInline: 'auto' }} />;
  }
  return (
    <Flex sx={{flexDirection: 'column', gap: '3rem'}}>
      {templates.map((template: Template) => {
        return <Template key={template._id} template={template}/>;
      })}
    </Flex>
  );
}

export default Templates;
