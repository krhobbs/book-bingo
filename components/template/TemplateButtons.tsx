import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
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
          //borderRadius: '4px 0px 0px 4px',
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
      {/* <Link
        href={{
          pathname: '/edit-template',
          query: {
            templateId: templateId,
          },
        }}
        style={{ display: 'contents' }}
        aria-label="edit template"
      >
        <Box
          sx={{
            alignItems: 'center',
            background: 'muted',
            borderRadius: '0px 4px 4px 0px',
            display: 'flex',
            flex: '1 1 0px',
            justifyContent: 'center',
            '&:hover': {
              boxShadow: 'pushedIn',
            },
          }}
        >
          <PencilIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        </Box>
      </Link> */}
    </Box>
  );
}

export default TemplateButtons;
