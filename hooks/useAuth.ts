"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function useAuth(shouldRedirect: boolean) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const routePath = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/login", redirect: shouldRedirect });
      return;
    }

    if (session?.access_token_expiry) {
      const shouldRefreshTime = Math.round(session?.access_token_expiry - Math.round(Date.now() / 1000));

      if (shouldRefreshTime < 0) {
        update();
      }
    }

    if (session === null) {
      if (routePath !== "/auth/login") {
        router.replace("/auth/login");
      }
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      if (routePath === "/auth/login") {
        router.replace("/");
      }
      setIsAuthenticated(true);
    }
  }, [session]);

  return isAuthenticated;
}
