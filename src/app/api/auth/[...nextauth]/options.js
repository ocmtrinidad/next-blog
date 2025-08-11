import { getUserByEmail } from "@/models/usersModels";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const options = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        let userRole = "user";
        if (profile.email === "ocmtrinidad@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
    }),
    Credentials({
      // Like a form
      // Button (Sign in with... "Credentials")
      name: "Credentials",
      // Inputs
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Your Email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await getUserByEmail(credentials.email);
          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );
            if (match) {
              foundUser.role = "user";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
