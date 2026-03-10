import { Box, Text } from 'theme-ui';

function TemplateListItem({ req }: { req: string }) {
  return (
    <Box variant='layout.listItem'>
      <Text variant="subheading">{req}</Text>
    </Box>
  );
}

export default TemplateListItem;
