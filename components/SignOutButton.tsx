import { Button } from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <Button variant="outlined" onClick={() => signOut()}>
      <LogoutIcon />
    </Button>
  );
}
