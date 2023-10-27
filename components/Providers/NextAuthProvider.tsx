'use client';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}
export default function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
