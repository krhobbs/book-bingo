import { TrashIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Box, Button, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../hooks/useBreakpoint';

interface TemplateButtonsProps {
  templateId: string;
  handleDeleteTemplate: () => void;
  sx?: ThemeUIStyleObject;
}

function TemplateButtons({
  templateId,
  handleDeleteTemplate,
  sx,
}: TemplateButtonsProps) {
  const breakpoint = useBreakpoint();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        ...sx,
      }}
    >
      <Button
        sx={{
          alignItems: 'center',
          background: 'destructive',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          padding: '0px',
        }}
        aria-label="delete book from square"
        onClick={() => handleDeleteTemplate()}
      >
        <TrashIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
      </Button>
    </Box>
  );
}

export default TemplateButtons;
