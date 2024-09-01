'use client';
import PasswordChangeForm from '@/components/Forms/PasswordChangeForm';
import useUser from '@/hooks/useUser';
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from '@mui/joy';

export default function ProfilePage() {
  const user = useUser();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <Typography level="h1">Mi Perfil</Typography>
      <Divider sx={{ my: 1 }} />
      <FormControl
        sx={{
          display: 'flex',
          margin: 'auto',
          width: '50%',
          py: 3,
        }}
      >
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          Nombre
        </FormLabel>
        <Input
          sx={{
            pr: 0,
          }}
          type="text"
          value={user?.name?.toString()}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          margin: 'auto',
          width: '50%',
          pb: 3,
        }}
      >
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          Mail
        </FormLabel>
        <Input
          sx={{
            pr: 0,
          }}
          type="text"
          value={user?.email?.toString()}
        />
      </FormControl>

      <Divider sx={{ my: 2 }} />
      <PasswordChangeForm />
    </Box>
  );
}
