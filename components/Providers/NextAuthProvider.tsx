'use client';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const NextAuthProvider: NextPage<{
  children?: ReactNode;
}> = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
