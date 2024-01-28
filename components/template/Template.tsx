import { Box } from 'theme-ui';
import TemplateSquares from './TemplateSquares';
import TemplateHeader from './TemplateHeader';

function Template({ template }: { template: Template }) {
  async function handleCreateFromTemplate() {
    await fetch(`/api/card/new`, {
      method: 'POST',
      body: JSON.stringify({
        templateID: template._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function handleDeleteTemplate() {
    await fetch(`/api/template/${template._id}/delete`, {
      method: 'POST',
      body: JSON.stringify({
        id: template._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <Box
      as="article"
      key={template._id}
      sx={{
        inlineSize: ['100%', 'min-content'],
        minInlineSize: '320px',
        mx: 'auto',
        px: ['0.1rem', '0'],
      }}
    >
      <TemplateHeader
        templateId={template._id}
        name={template.name}
        handleDeleteTemplate={handleDeleteTemplate}
        handleCreateFromTemplate={handleCreateFromTemplate}
      />
      <TemplateSquares reqs={template.reqs} />
    </Box>
  );
}

export default Template;
