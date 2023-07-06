export enum Role {
  user = "user",
  admin = "admin",
}

declare module "next-auth" {
  interface User {
    role?: Role;
    access_token: string;
    refresh_token: string;
  }

  interface Session extends DefaultSession {
    access_token: string;
    access_token_expiry: number;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    error?: string;
    userName: string;
    access_token: string;
    refresh_token: string;
    access_token_expiry: number;
  }
}
