import { Box } from 'theme-ui';
import TemplateSquares from './TemplateSquares';
import TemplateHeader from './TemplateHeader';

function Template({ template }: { template: Template }) {

  async function createFromHandler() {
    console.log('Calling Create Template');
    const response = await fetch(`/api/card/new`, {
      method: 'POST',
      body: JSON.stringify({
        templateId: template._id,
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
      <TemplateHeader templateId={template._id} name={template.name} handleCreateFrom={createFromHandler} />
      <TemplateSquares templateId={template._id} reqs={template.reqs} />
    </Box>
  );
}

export default Template;
