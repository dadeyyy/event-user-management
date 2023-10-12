import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';
import { DefaultSession } from 'next-auth';
import type { Role } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
  }
}

export const options: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.name = token.name as string;
        session.user.role = token.role as Role;
      }

      return session;
    }
    
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter Username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (user) {
          const checkPassword = await compare(
            credentials.password,
            user.password
          );
          if (checkPassword) {
            return {
              id: user.id + '',
              name: user.username,
              password: user.password,
              role: user.role,
            };
          }
          return null;
        }

        return null;
      },
    }),
  ]
};
