import { Sheet, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoadingOverlay from './LoadingOverlay';

interface Props {
  children?: React.ReactNode;
}
export default function MainContent({ children }: Props) {
  const session = useSession();
  if (session.status === 'unauthenticated') redirect('/api/auth/signin');
  if (session.status === 'loading') return <LoadingOverlay />;

  return (
    <Sheet
      sx={{
        minWidth: '100%',
        px: 2,
        py: {
          xs: 8,
          md: 2,
        },
        marginLeft: {
          sm: '0',
          md: '68px',
        },
      }}
    >
      {children}
    </Sheet>
  );
}
