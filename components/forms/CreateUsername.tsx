import { useForm, type SubmitHandler } from "react-hook-form";
import { Box, Button, Input, Label } from "theme-ui";
import { Spacer } from "../ui";
import { setUsername } from "../../utils/fetchers";
import { useSession } from "next-auth/react";

export default function CreateUsername() {
  const { register, handleSubmit } = useForm<{ username: string }>();
  const { data, status } = useSession();

  const onSubmit: SubmitHandler<{ username: string }> = async ({ username }) => {
    if (data?.user) {
      await setUsername(data?.user.id, username);
    }
  }

  if (status === 'loading') {
    return <div>loading...</div>
  }

  return (
    <Box as="form" variant="layout.form" onSubmit={handleSubmit(onSubmit)}>
      <Spacer size={['6rem']} />
      <Label htmlFor="username">Username</Label>
      <Input type="text" required id="username" {...register('username', { required: true })} />
      <Spacer size="1rem" />
      <Button>Save Username</Button>
    </Box>
  )
}