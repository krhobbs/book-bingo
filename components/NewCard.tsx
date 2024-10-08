import { Box, Text, Select, Button } from 'theme-ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './ui/Modal';
import useSWR from 'swr';
import { fetchTemplateNames } from '../utils/api-utils';
import { useForm } from 'react-hook-form';

const SelectTemplateForm = ({
  templates,
  onNewCard,
  closeModal,
}: {
  templates: Template[];
  onNewCard: Function;
  closeModal: Function;
}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ template }: { template: number }) => {
    onNewCard(templates[template], closeModal);
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: ['column', 'row'],
        gap: ['1rem', '1rem'],
      }}
    >
      <Select sx={{ minWidth: '15rem' }} {...register('template')}>
        {templates.map((template, idx) => {
          return (
            <option key={template.name} value={idx}>
              {template.name}
            </option>
          );
        })}
      </Select>
      <Button>Create</Button>
    </Box>
  );
};

function NewCard({
  handleNewCard,
}: {
  handleNewCard: (template: Template, closeModal: () => void) => void;
}) {
  const [showSelectTemplate, setShowSelectTemplate] = useState(false);
  const { data } = useSWR('/api/templates', fetchTemplateNames);

  return (
    <>
      <Box
        as="button"
        sx={{
          alignItems: 'center',
          blockSize: ['520px', '682px'],
          background: 'transparent',
          border: (theme) => `2px solid ${theme.colors.muted}`,
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
              templates={data}
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
