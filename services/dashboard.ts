import { ApiClient } from "@/config/axios";
import { DASHBOARD_API_ROUTES } from "@/features/dashboard/const/apiRoutes";
import { ProductCategory } from "@/types/category";
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

export const editProductCategory =
  (apiClient: ApiClient) =>
  async (productCategory: ProductCategory): Promise<number> => {
    const { put } = apiClient;
    try {
      const res = await put(DASHBOARD_API_ROUTES.productCategories, productCategory);
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

export const getAllProductCategories = (apiClient: ApiClient) => async (): Promise<ProductCategory[]> => {
  const { get } = apiClient;

  try {
    const res = await get(`/api/v1/dashboard/product-categories`);
    return res.result;
  } catch (error) {
    throw error;
  }
};

export const getProductCategory =
  (apiClient: ApiClient) =>
  async (id: number): Promise<ProductCategory> => {
    const { get } = apiClient;

    try {
      const res = await get(DASHBOARD_API_ROUTES.productCategory(id));
      return res.result;
    } catch (error) {
      throw error;
    }
  };
