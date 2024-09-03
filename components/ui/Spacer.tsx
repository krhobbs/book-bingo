import { Box } from 'theme-ui';
import type { ReactElement } from 'react';
import type { BoxProps } from 'theme-ui';

interface SpacerProps extends BoxProps {
  size: number | string | number[] | string[];
}

function getUnit(size: string | number): string {
  return typeof size === 'string' ? size : `${size}px`;
}

function Spacer(props: SpacerProps): ReactElement {
  const { sx = {}, size = '1px', ...rest } = props;
  const blockSize = Array.isArray(size)
    ? size.map((bp: number | string) => getUnit(bp))
    : getUnit(size);

  return <Box sx={{ blockSize, minInlineSize: '1px', ...sx }} {...rest} />;
}

export default Spacer;
