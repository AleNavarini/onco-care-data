import { Box, CircularProgress } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
}
export default function MainContent({ children }: Props) {
  const session = useSession();
  if (session.status === 'unauthenticated') redirect('/api/auth/signin');

  return (
    <Box
      component="main"
      className="MainContent"
      sx={(theme) => ({
        px: {
          xs: 2,
          md: 6,
        },
        pt: {
          xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
          sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
          md: 3,
        },
        pb: {
          xs: 2,
          sm: 2,
          md: 3,
        },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
        marginLeft: {
          md: 'var(--FirstSidebar-width)',
        },
      })}
    >
      {children}
    </Box>
  );
}
