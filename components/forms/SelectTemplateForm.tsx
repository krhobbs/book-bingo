import { Box, Button, Select } from "theme-ui";
import { useForm } from "react-hook-form";

const SelectTemplateForm = ({
  templates,
  onNewCard,
  closeModal,
}: {
  templates: Template[];
  onNewCard: Function;
  closeModal: Function;
}) => {
  const { register, handleSubmit } = useForm<{ template: number }>();
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

export default SelectTemplateForm;