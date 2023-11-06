import TemplatesLayout from '../components/layout/pages/TemplatesLayout';
import { getAllTemplates } from '../utils/db-utils';

export default function Template({ templates }: { templates: Template[] }) {
  return <TemplatesLayout templates={templates} />;
}

export async function getStaticProps() {
  try {
    const templates = await getAllTemplates();

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
