"use client";

import React from "react";
import useSWR from "swr";

import { RankingsTable } from "@/features/dashboard/components/tables/rankings/RankingTable";
import { DASHBOARD_API_ROUTES } from "@/features/dashboard/const/apiRoutes";
import { useDashboardApiClient } from "@/features/dashboard/hooks/useDashboardApi";
import { getAllRankings } from "@/services/dashboard";

const Rankings = () => {
  const { apiClient } = useDashboardApiClient();

  const { data, isLoading, error } = useSWR(DASHBOARD_API_ROUTES.rankings, getAllRankings(apiClient));

  return (
    <>
      <main>
        {isLoading && <div>Loading...</div>}

        {error && !isLoading && <div>Error...</div>}

        {data && data?.length > 0 && <RankingsTable rankings={data} />}
      </main>
    </>
  );
};

export default Rankings;
