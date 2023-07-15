import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();



export default NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      
      // Send properties to the client, like an access_token from a provider
      return {...session, user:{...session.user, ...user}};
    },

  },
  secret: process.env.NEXTAUTH_SECRET
});


// callbacks: {
//   signIn: async (user, account, profile) => {
//     if (account.provider === 'google') {
//       const phoneNumber = prompt('Please enter your phone number');
//       user.phoneNumber = phoneNumber;
//     }

//     return true;
//   },
// },