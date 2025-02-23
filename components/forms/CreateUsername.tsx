import { useForm, type SubmitHandler } from "react-hook-form";
import { Box, Button, Input, Label } from "theme-ui";
import { Spacer } from "../ui";
import { setUsername } from "../../utils/api-utils";
import { useSession } from "next-auth/react";

export default function CreateUsername() {
  const { register, handleSubmit } = useForm<{ username: string }>();
  const { data, status } = useSession();

  const onSubmit: SubmitHandler<{ username: string }> = async ({ username }) => {
    if (data?.user?.identifier && data?.user?.provider) {
      await setUsername(username, data.user.identifier, data.user.provider);
    } else {
      console.error('USER DATA NOT AVAILABLE TO SET USERNAME...');
    }
  }

  if (status === 'loading') {
    return <div>loading...</div>
  }

  return (
    <Box as="form" variant="layout.form" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="username">Username</Label>
      <Input type="text" required id="username" {...register('username', { required: true })} />
      <Spacer size="1rem" />
      <Button>Save Username</Button>
    </Box>
  )
}