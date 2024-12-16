import Head from 'next/head';
import { Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import GridListSwitch from '../../ui/GridListSwitch';
import Templates from '../../Templates';
import useSWR from 'swr';
import { fetchTemplates } from '../../../utils/api-utils';
import { useRouter } from 'next/router';
import Pagination from '../../ui/Pagination';

interface TemplatesLayoutProps {
  templates: Template[];
  pageCount: number;
}

function TemplatesLayout({ templates, pageCount }: TemplatesLayoutProps) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const { data } = useSWR(
    `/api/templates?page=${page}`,
    fetchTemplates,
    { fallbackData: templates },
  );

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
      {data.length === 0 ? (
        <Text variant="body1">No Templates.</Text>
      ) : (
        <>
          <Templates templates={data} />
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
