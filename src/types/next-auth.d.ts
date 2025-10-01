
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: string;
    };
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    token?: string;
  }
}
