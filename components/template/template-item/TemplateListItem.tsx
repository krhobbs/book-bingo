import { Box, Text } from 'theme-ui';

function TemplateListItem({ req }: { req: string }) {
  return (
    <Box variant='cards.listItem'>
      <Text variant="subheading">{req}</Text>
    </Box>
  );
}

export default TemplateListItem;
