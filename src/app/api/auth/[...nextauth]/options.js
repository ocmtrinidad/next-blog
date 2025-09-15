import { getUserByEmail, getUserById } from "@/models/userModels";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";

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
          label: "Email",
          type: "text",
          placeholder: "Your Email",
        },
        password: {
          label: "Password",
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
      // On initial sign in
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.bio = user.bio;
        token.picture = user.image;
      }

      // Refresh user data on each request to get updated profile info
      if (token.id) {
        try {
          const freshUser = await getUserById(token.id);
          if (freshUser) {
            token.name = freshUser.name;
            token.email = freshUser.email;
            token.picture = freshUser.image;
            token.bio = freshUser.bio;
          }
        } catch (error) {
          console.error("Error refreshing user data in JWT callback:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.bio = token.bio;
      }
      return session;
    },
  },
};
