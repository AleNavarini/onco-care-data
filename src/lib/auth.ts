import { NextAuthOptions } from 'next-auth';
import prisma from './prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(
        credentials,
      ): Promise<{ id: string; email: string; name: string | null }> {
        if (!credentials) throw new Error('Credenciales vacias');
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) throw new Error('Usuario no existente');

        const encodedPassword = btoa(credentials.password);
        if (user.password !== encodedPassword)
          throw new Error('Contraseña incorrecta');

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/login',
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
