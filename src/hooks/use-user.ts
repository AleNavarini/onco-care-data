import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function useUser() {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect('/api/v1/auth/signin');

  if (session.status === 'authenticated') return session.data.user;
}
