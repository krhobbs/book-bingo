import Head from 'next/head';
import { Text } from 'theme-ui';
import { GridListSwitch, Pagination, Spacer } from '../../ui';
import Templates from '../../Templates';
import useSWR from 'swr';
import { fetchTemplates } from '../../../utils/api-utils';
import { useRouter } from 'next/router';
import useTemplates from '../../../hooks/useTemplates';

interface TemplatesLayoutProps {
  templates: Template[];
  pageCount: number;
}

function TemplatesLayout({ templates: fallbackTemplates, pageCount }: TemplatesLayoutProps) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { templates } = useTemplates({ filters: { page }, fallback: { templates: fallbackTemplates, pageCount } })

  return (
    <>
      <Head>
        <title>Book Bingo | Templates</title>
      </Head>
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        Templates
      </Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {templates.length === 0 ? (
        <Text variant="body1">No Templates.</Text>
      ) : (
        <>
          <Templates templates={templates} />
          {pageCount > 1 && (
            <>
              <Spacer size="1rem" />
              <Pagination pageCount={pageCount} currentPage={page} />
            </>
          )}
          <Spacer size="2rem" />
        </>
      )}
    </>
  );
}

export default TemplatesLayout;
