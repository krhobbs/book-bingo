import { Box } from 'theme-ui';
import TemplateSquares from './TemplateSquares';
import TemplateHeader from './TemplateHeader';
import { createCard, deleteTemplate } from '../../utils/fetchers';

function Template({ template }: { template: Template }) {
  async function handleCreateFromTemplate() {
    await createCard(template.id);
  }

  async function handleDeleteTemplate() {
    await deleteTemplate(template.id);
  }

  return (
    <Box
      as="article"
      key={template.id}
      variant="cards.card"
    >
      <TemplateHeader
        templateId={template.id}
        name={template.name}
        handleDeleteTemplate={handleDeleteTemplate}
        handleCreateFromTemplate={handleCreateFromTemplate}
      />
      <TemplateSquares reqs={template.reqs} />
    </Box>
  );
}

export default Template;
