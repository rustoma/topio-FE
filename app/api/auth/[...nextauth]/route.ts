import jwt_decode from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/v1/refresh`, {
    credentials: "include",
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      refresh_token: token.refresh_token,
    }),
  });

  if (!res.ok) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }

  const newAccessToken = await res.json();

  const jwtDecoded: JWTClaims = jwt_decode(newAccessToken.access_token);

  return {
    ...token,
    access_token: newAccessToken.access_token,
    access_token_expiry: jwtDecoded.exp,
    error: undefined,
  };
}

const authProviders = () => [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      user_name: {
        label: "Email",
        type: "email",
        placeholder: "example@example.com",
      },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const res = await fetch(`${process.env.BACKEND_HOST}/api/v1/login`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          user_name: credentials?.user_name,
          password: credentials?.password,
        }),
      });

      if (!res.ok) {
        return null;
      }

      const cookies = res.headers.get("set-cookie");

      const user = await res.json();

      if (user.access_token) {
        return {
          id: "1",
          access_token: user.access_token,
          refresh_token: cookies ? cookies.match(new RegExp(`(^| )${"jwt"}=([^;]+)`))?.at(2) ?? "" : "",
        };
      }

      return null;
    },
  }),
];

interface JWTClaims {
  user_name: string;
  roles: number[];
  iss: string;
  aud: string[];
  exp: number;
  iat: number;
}

const callbacks = {
  jwt: async ({ token, user }: { token: JWT; user: User }) => {
    if (user) {
      // This will only be executed at login. Each next invocation will skip this part.
      const jwtDecoded: JWTClaims = jwt_decode(user.access_token);

      token.access_token = user.access_token;
      token.refresh_token = user.refresh_token;
      token.access_token_expiry = jwtDecoded.exp;
      token.userName = jwtDecoded.user_name;
    }

    // access_token_expiry is in seconds, so we need to divide Dta.now() / 1000 because is in milliseconds
    // 1 second before we should refresh
    const shouldRefreshTime = Math.round(token.access_token_expiry - 1 - Math.round(Date.now() / 1000));

    // If the token is still valid, just return it.
    if (shouldRefreshTime > 0) {
      return Promise.resolve(token);
    }

    // We allow to refresh the token.
    const newToken = await refreshAccessToken(token);

    return Promise.resolve(newToken);
  },
  session: async ({ session, token }: { session: Session; token: JWT }) => {
    console.log({ token });
    // Here we pass accessToken to the client to be used in authentication with your API
    session.access_token = token.access_token;
    session.access_token_expiry = token.access_token_expiry;
    session.error = token.error;
    session.user = {};
    session.user.email = token.userName;
    session.user.name = token.userName;

    return Promise.resolve(session);
  },
};

const nextAuthOptions = () => ({
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  providers: authProviders(),
  callbacks,
  events: {
    async signOut({ token }: { token: JWT }) {
      await fetch(`${process.env.BACKEND_HOST}/api/v1/logout`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          refresh_token: token.refresh_token,
        }),
      });
      try {
      } catch (e) {
        console.log({ e });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

const Auth = async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, nextAuthOptions());
};

export { Auth as GET, Auth as POST };
