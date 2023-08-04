import Head from 'next/head';
import { Text } from 'theme-ui';
import Spacer from '../../ui/Spacer';
import GridListSwitch from '../../ui/GridListSwitch';
import Templates from '../../Templates';
import NewTemplate from '../../NewTemplate';

interface TemplateLayoutProps {
  templates: Template[];
}

function ArchivedLayout({ templates }: TemplateLayoutProps) {
  return (
    <>
      <Head>
        <title>Book Bingo | Templates</title>
      </Head>
      <Text variant="heading1" as="h1" sx={{ textAlign: 'center' }}>
        Your Templates
      </Text>
      <Spacer size="2rem" />
      <GridListSwitch />
      <Spacer size="2rem" />
      {templates.length === 0 ? (
        <NewTemplate />
      ) : (
        <>
          <Templates templates={templates} />
          <Spacer size="2rem" />
          <NewTemplate />
        </>
      )}
    </>
  );
}

export default ArchivedLayout;
