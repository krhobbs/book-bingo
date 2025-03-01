import { Box, Text } from 'theme-ui';

function TemplateItem({ req }: { req: string }) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        blockSize: ['100px', '138px'],
        inlineSize: ['auto', '112px'],
        border: (theme) => `solid 1px ${theme.colors?.accent}`,
        borderRadius: '5px',
        boxShadow: (theme) => `1px 1px 0px 1px ${theme.colors?.accent}`,
        padding: ['0.05rem', '0.1rem'],
      }}
    >
      <Text variant="body1">{req}</Text>
    </Box>
  );
}

export default TemplateItem;
