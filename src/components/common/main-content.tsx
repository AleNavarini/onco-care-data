import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import CenteredLoading from '../ui/centered-loading';

interface Props {
  children?: React.ReactNode;
}

export default function MainContent({ children }: Props) {
  const session = useSession();
  if (session.status === 'unauthenticated') redirect('/api/auth/signin');
  if (session.status === 'loading') return <CenteredLoading />;

  return (
    <main
      className={`
        flex flex-col h-screen gap-1 p-4 w-full ml-16`}
    >
      {children}
    </main>
  );
}
