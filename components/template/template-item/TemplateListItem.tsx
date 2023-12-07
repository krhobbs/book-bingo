import { Box, Text } from 'theme-ui';

function TemplateListItem({ req }: { req: string}) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        inlineSize: ['98%', '512px'],
        blockSize: '212px',
        border: (theme) =>
          `solid 1px ${theme.colors.accent}`,
        borderRadius: '5px',
        boxShadow: (theme) =>
          `1px 1px 0px 1px ${theme.colors.accent}`,
          marginInline: 'auto'
      }}
    >
      <Text variant="subheading">{req}</Text>
    </Box>
  );
}

export default TemplateListItem;
