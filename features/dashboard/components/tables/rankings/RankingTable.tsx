import React, { useState } from "react";
import Link from "next/link";
import { mutate } from "swr";

import { ApiClient } from "@/config/axios";
import { Button } from "@/features/dashboard/components/button/Button";
import { Card } from "@/features/dashboard/components/card/Card";
import { Table } from "@/features/dashboard/components/table/Table";
import { TableHeader } from "@/features/dashboard/components/table/TableHeader";
import { TableHeading } from "@/features/dashboard/components/table/TableHeading";
import { TableRow } from "@/features/dashboard/components/table/TableRow";
import { TableRowItem } from "@/features/dashboard/components/table/TableRowItem";
import { DASHBOARD_API_ROUTES } from "@/features/dashboard/const/apiRoutes";
import { useDashboardApiClient } from "@/features/dashboard/hooks/useDashboardApi";
import { Page } from "@/types/page";

import "./rankingTable.style.scss";
import "./rankingTable.style.scss";

interface RankingsTableProps {
  rankings: Page[];
}

export const RankingsTable = ({ rankings }: RankingsTableProps) => {
  const { apiClient } = useDashboardApiClient();
  const [isLoading, setIsLoading] = useState<number[]>([]);
  const [isError, setIsError] = useState<number[]>([]);

  const togglePublic = async (apiClient: ApiClient, relatedPageId: number, isPublished: boolean) => {
    const { post } = apiClient;

    try {
      setIsError((prev) => prev.filter((e) => e !== relatedPageId));
      setIsLoading((prev) => [...prev, relatedPageId]);

      await post(DASHBOARD_API_ROUTES.publishRanking(relatedPageId), {
        is_published: isPublished,
      });
      await mutate(DASHBOARD_API_ROUTES.rankings);
    } catch (error) {
      setIsError((prev) => [...prev, relatedPageId]);
    } finally {
      setIsLoading((prev) => prev.filter((e) => e !== relatedPageId));
    }
  };

  const generateTexts = async (apiClient: ApiClient, relatedPageId: number) => {
    const { get } = apiClient;

    try {
      setIsError((prev) => prev.filter((e) => e !== relatedPageId));
      setIsLoading((prev) => [...prev, relatedPageId]);

      await get(DASHBOARD_API_ROUTES.regeneratePageTexts(relatedPageId));
      await mutate(DASHBOARD_API_ROUTES.rankings);
    } catch (error) {
      setIsError((prev) => [...prev, relatedPageId]);
    } finally {
      setIsLoading((prev) => prev.filter((e) => e !== relatedPageId));
    }
  };

  const generateProducts = async (apiClient: ApiClient, relatedPageId: number) => {
    const { post } = apiClient;

    try {
      setIsError((prev) => prev.filter((e) => e !== relatedPageId));
      setIsLoading((prev) => [...prev, relatedPageId]);

      await post(DASHBOARD_API_ROUTES.products, {
        related_page: relatedPageId,
        simplified_product_names: false,
      });
      await mutate(DASHBOARD_API_ROUTES.rankings);
    } catch (error) {
      setIsError((prev) => [...prev, relatedPageId]);
    } finally {
      setIsLoading((prev) => prev.filter((e) => e !== relatedPageId));
    }
  };

  const sortByID = (a: Page, b: Page) => {
    return a.id - b.id;
  };

  return (
    <Card>
      <div className="ranking-table-actions">
        <Link passHref href="/dashboard/rankings/create">
          <Button>Nowa strona</Button>
        </Link>
      </div>
      <Table>
        <thead>
          <TableHeader>
            <TableHeading>ID</TableHeading>
            <TableHeading>Title</TableHeading>
            <TableHeading>Edycja</TableHeading>
          </TableHeader>
        </thead>
        <tbody>
          {rankings.sort(sortByID).map((ranking) => (
            <TableRow key={ranking.id}>
              <TableRowItem> {ranking.id}</TableRowItem>
              <TableRowItem> {ranking.title}</TableRowItem>

              {ranking.queue_upd && !isError.includes(ranking.id) && (
                <TableRowItem>
                  <Button size="sm" disabled style="secondary">
                    Aktualizacja strony....
                  </Button>
                </TableRowItem>
              )}

              {!ranking.queue_upd && !isError.includes(ranking.id) && (
                <TableRowItem>
                  <div>
                    <Button
                      size="sm"
                      onClick={() => generateTexts(apiClient, ranking.id)}
                      loading={isLoading.includes(ranking.id)}>
                      Regeneruj teksty na stronę
                    </Button>
                  </div>

                  {ranking.products && ranking.products.length > 0 ? (
                    <div>
                      <Button size="sm">Aktualizuj produkty</Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        size="sm"
                        onClick={() => generateProducts(apiClient, ranking.id)}
                        loading={isLoading.includes(ranking.id)}>
                        Generuj produkty
                      </Button>
                    </div>
                  )}

                  <div>
                    <Button
                      size="sm"
                      onClick={() => togglePublic(apiClient, ranking.id, !ranking.is_published)}
                      loading={isLoading.includes(ranking.id)}>
                      {ranking.is_published ? "Przestań publikować" : "Publikuj"}
                    </Button>
                  </div>
                </TableRowItem>
              )}

              {isError.includes(ranking.id) && <div>Error</div>}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};