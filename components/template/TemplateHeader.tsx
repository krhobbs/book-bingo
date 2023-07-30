import { Box, Text } from 'theme-ui';

function TemplateHeader({
  name
}: { name: string}) {

  return (
    <Box
      as="section"
      sx={{ alignItems: 'center', display: 'flex', gap: '1.5rem' }}
    >
      <Text variant="heading1">{name}</Text>
    </Box>
  );
}

export default TemplateHeader;
