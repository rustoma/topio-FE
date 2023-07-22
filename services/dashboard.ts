import { ApiClient } from "@/config/axios";
import { DASHBOARD_API_ROUTES } from "@/features/dashboard/const/apiRoutes";
import { CreatePageRequest, Page } from "@/types/page";

export const getAllRankings = (apiClient: ApiClient) => async (): Promise<Page[]> => {
  const { get } = apiClient;

  try {
    const res = await get(`/api/v1/dashboard/pages`);
    return res.result;
  } catch (error) {
    throw error;
  }
};

export const createProductCategory =
  (apiClient: ApiClient) =>
  async (name: string): Promise<number> => {
    const { post } = apiClient;

    try {
      const res = await post(DASHBOARD_API_ROUTES.productCategories, { name });
      return res.result;
    } catch (error) {
      throw error;
    }
  };

export const createPage =
  (apiClient: ApiClient) =>
  async (data: CreatePageRequest): Promise<number> => {
    const { post } = apiClient;

    try {
      const res = await post(DASHBOARD_API_ROUTES.rankings, data);
      return res.result;
    } catch (error) {
      throw error;
    }
  };
