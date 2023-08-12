import TemplatesLayout from '../components/layout/pages/TemplatesLayout';
import { connectDatabase, getDocuments } from '../utils/db-utils';

export default function Template({ templates }: { templates: Template[] }) {
  return <TemplatesLayout templates={templates} />;
}

export async function getStaticProps() {
  try {
    const client = await connectDatabase();
    const templates = await getDocuments(client, 'templates');
    client.close();

    return {
      props: {
        templates: templates,
      },
      revalidate: 800,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
