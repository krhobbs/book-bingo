import Template from './template/Template';
import { Flex } from 'theme-ui';

function Templates({ templates } : { templates: Template[] }) {
  return (
    <Flex sx={{flexDirection: 'column', gap: '2rem'}}>
      {templates.map((template: Template) => {
        return <Template template={template}/>;
      })}
    </Flex>
  );
}

export default Templates;
