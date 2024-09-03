import { Box, Button, Text } from 'theme-ui';
import Spacer from '../ui/Spacer';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import TemplateButtons from './TemplateButtons';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useMemo } from 'react';

interface TemplateHeader {
  templateId: string;
  name: string;
  handleDeleteTemplate: () => void;
  handleCreateFromTemplate: () => void;
}

function TemplateHeader({
  templateId,
  name,
  handleDeleteTemplate,
  handleCreateFromTemplate,
}: TemplateHeader) {
  const breakpoint = useBreakpoint();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint],
  );

  return (
    <>
      <Box
        as="section"
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'space-between',
        }}
      >
        <Text as="h2" variant="heading2">
          {name}
        </Text>
        <TemplateButtons
          templateId={templateId}
          handleDeleteTemplate={handleDeleteTemplate}
          sx={{ blockSize: ['1.5rem', '1.7rem'], inlineSize: ['3rem', '4rem'] }} // Double Inline-Size for edit-template
        />
      </Box>
      <Spacer size="0.5rem" />
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Text variant="body1">Create card from this template: </Text>
        <Button
          variant="primary"
          sx={{ padding: '0.3rem 1rem' }}
          onClick={() => handleCreateFromTemplate()}
        >
          <DocumentPlusIcon
            style={{
              width: iconSize,
              height: iconSize,
              transform: 'translateY(1px)',
            }}
          />
        </Button>
      </Box>
      <Spacer size="1rem" />
    </>
  );
}

export default TemplateHeader;
