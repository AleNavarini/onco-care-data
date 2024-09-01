import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function useUser() {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect('/api/auth/signin');

  if (session.status === 'authenticated') return session.data.user;
}
