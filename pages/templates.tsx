import TemplatesLayout from '../components/layout/pages/TemplatesLayout';
import { getAllTemplates } from '../utils/db-utils';

export default function TemplatesPage({
  templates,
  pageCount,
}: {
  templates: Template[];
  pageCount: number;
}) {
  return <TemplatesLayout templates={templates} pageCount={pageCount} />;
}

export async function getStaticProps() {
  try {
    const [templates, pageCount] = await getAllTemplates();

    return {
      props: {
        templates: templates,
        templateCount: pageCount,
      },
      revalidate: 800,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        templates: [],
        pageCount: 1,
      },
      revalidate: 800,
    };
  }
}
