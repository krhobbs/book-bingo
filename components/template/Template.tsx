import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Box, Spinner, Text } from 'theme-ui';
import TemplateSquares from './TemplateSquares';
import TemplateHeader from './TemplateHeader';

function Template({ template }: { template: Template }) {
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

  return (
    <Box
      as="article"
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['0.1rem', '0'],
      }}
    >
      <TemplateHeader name={template.name} />
      <TemplateSquares templateId={template._id} reqs={template.reqs} />
    </Box>
  );
}

export default Template;
