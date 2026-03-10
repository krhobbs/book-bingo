import { Box, Text } from 'theme-ui';

function TemplateItem({ req }: { req: string }) {
  return (
    <Box
      variant='layout.gridItem'
      sx={{
        padding: ['0.05rem', '0.1rem'],
      }}
    >
      <Text variant="body1">{req}</Text>
    </Box>
  );
}

export default TemplateItem;
