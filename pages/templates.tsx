import Templates from '../components/Templates';
import { connectDatabase, getTemplates } from '../utils/db-utils';

export default function TemplatePage({ templates }: { templates: Template[] }) {
  return <Templates templates={templates}/>;
}

export async function getStaticProps() {
  try {
    const client = await connectDatabase();
    const templates = await getTemplates(client);
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
