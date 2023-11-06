import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export const options = {

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/register'
  },

  callbacks: {
    async session({ token, user }) {
      if (user) token.id = user.id
      return token;
    },

    async sesssion({ session, token}){
      if (session?.user) session.user.id = token.id
      return session
    }
  },

  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials, req) {
        //validate username/pw
        const { username, password } = credentials;

        try {
          const user = await db.user.findUnique({
            where: { username: username },
            select: {
              id: true,
              username: true,
              password: true,
            },
          });
  
          const passwordCorrect = await compare(
            credentials?.password  || '',
            user.password
          )

          if (passwordCorrect){
            return {
              name: user.username,
              id: user.id,
            }
          } 
        } catch (e) {
          throw new Error("Invalid username or password.")
        }
      },
    }),
  ],
};
