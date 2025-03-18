import { Box, Text } from 'theme-ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from './ui';
import useSWR from 'swr';
import SelectTemplateForm from './forms/SelectTemplateForm';
import { fetchTemplates } from '../utils/fetchers';

function NewCard({
  handleNewCard,
}: {
  handleNewCard: (template: Template, closeModal: () => void) => void;
}) {
  const [showSelectTemplate, setShowSelectTemplate] = useState(false);
  const { data } = useSWR('/api/templates', fetchTemplates);

  return (
    <>
      <Box
        as="button"
        sx={{
          alignItems: 'center',
          blockSize: ['520px', '682px'],
          background: 'transparent',
          border: (theme) => `2px solid ${theme.colors?.muted}`,
          borderRadius: '1rem',
          color: 'muted',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          inlineSize: ['95%', '532px'],
          justifyContent: 'center',
          maxInlineSize: '100%',
          mx: 'auto',
        }}
        onClick={() => {
          setShowSelectTemplate(true);
        }}
      >
        <Text variant="body2">New Bingo Card</Text>
        <PlusIcon style={{ blockSize: '96px', inlineSize: '96px' }} />
      </Box>
      {showSelectTemplate &&
        createPortal(
          <Modal closeModal={() => setShowSelectTemplate(!showSelectTemplate)}>
            <SelectTemplateForm
              templates={data?.templates ?? []}
              onNewCard={handleNewCard}
              closeModal={() => setShowSelectTemplate(!showSelectTemplate)}
            />
          </Modal>,
          document.body,
          'select-template',
        )}
    </>
  );
}

export default NewCard;
