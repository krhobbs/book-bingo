import { Text, Box } from 'theme-ui';

interface CompleteFrontProps {
  bookReq: string;
  flipped: boolean;
}

function CompleteFront({ bookReq, flipped }: CompleteFrontProps) {
  return (
    <Box
      variant="layout.animatedSquareSide"
      sx={{
        transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
      }}
    >
      <Text variant="body1">{bookReq}</Text>
    </Box>
  );
}

export default CompleteFront;
