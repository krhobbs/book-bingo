import Head from 'next/head';
import { Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import GridListSwitch from '../../ui/GridListSwitch';
import Templates from '../../Templates';
import useSWR from 'swr';
import { fetchTemplates } from '../../../utils/api-utils';

interface TemplatesLayoutProps {
  templates: Template[];
}

function TemplatesLayout({ templates }: TemplatesLayoutProps) {
  const { data, mutate } = useSWR(`/api/templates`, fetchTemplates, { fallbackData: templates });
  
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
        <Text variant='body1'>No Templates.</Text>
      ) : (
        <>
          <Templates templates={data} />
          <Spacer size="2rem" />
        </>
      )}
    </>
  );
}

export default TemplatesLayout;
