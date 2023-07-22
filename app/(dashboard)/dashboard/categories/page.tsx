"use client";

import React from "react";
import useSWR from "swr";

import { CategoriesTable } from "@/features/dashboard/components/tables/categories/CategoriesTable";
import { PAGE_ROUTES } from "@/features/dashboard/const/pageRoutes";
import { useDashboardApiClient } from "@/features/dashboard/hooks/useDashboardApi";
import { getAllProductCategories } from "@/services/dashboard";

const Categories = () => {
  const { apiClient } = useDashboardApiClient();

  const {
    data: categories,
    isLoading: areCategoriesLoading,
    error: categoriesError,
  } = useSWR(PAGE_ROUTES.rankingsCreate, getAllProductCategories(apiClient));

  return (
    <main>
      {areCategoriesLoading && <div>Loading...</div>}

      {categoriesError && !areCategoriesLoading && <div>Error...</div>}

      {categories && <CategoriesTable categories={categories} />}
    </main>
  );
};

export default Categories;
