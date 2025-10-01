import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();
        // console.log(payload);

        if (payload.message === "success") {
          const { id }: { id: string } = jwtDecode(payload.token);

          return {
            id,
            name: payload.user.name,
            email: payload.user.email,
            role: payload.user.role,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "failed");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string,
        
        };
        session.token = token.token;
      }
      return( session);
    },
  },
};

export default NextAuth(authOptions);
