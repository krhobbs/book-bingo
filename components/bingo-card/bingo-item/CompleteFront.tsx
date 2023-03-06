import { Text } from 'theme-ui';

interface CompleteFrontProps {
  bookReq: string;
}

function CompleteFront({ bookReq }: CompleteFrontProps) {
  return (
      <Text variant="body1">
        {bookReq}
      </Text>
  );
}

export default CompleteFront;
