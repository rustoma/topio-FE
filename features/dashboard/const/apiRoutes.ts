export const DASHBOARD_API_ROUTES = {
  rankings: "/api/v1/dashboard/pages",
  publishRanking: (id: number) => `/api/v1/dashboard/pages/${id}/is-published`,
  products: "/api/v1/dashboard/products",
  updateProducts: "/api/v1/dashboard/products/page",
  productCategories: "/api/v1/dashboard/product-categories",
  productCategory: (id: number) => `/api/v1/dashboard/product-categories/${id}`,
  regeneratePageTexts: (id: number) => `/api/v1/dashboard/pages/${id}/regenerate`,
};
