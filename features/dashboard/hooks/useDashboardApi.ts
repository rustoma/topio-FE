import { useSession } from "next-auth/react";

import { getApi } from "@/config/axios";

export const useDashboardApiClient = () => {
  const { data: session } = useSession();

  return { apiClient: getApi({ accessToken: session?.access_token }) };
};
