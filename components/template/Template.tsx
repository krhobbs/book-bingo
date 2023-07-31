import { Box } from 'theme-ui';
import TemplateSquares from './TemplateSquares';
import TemplateHeader from './TemplateHeader';

function Template({ template }: { template: Template }) {
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
      <TemplateHeader name={template.name} />
      <TemplateSquares templateId={template._id} reqs={template.reqs} />
    </Box>
  );
}

export default Template;
