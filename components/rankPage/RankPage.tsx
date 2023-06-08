"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Container } from "@/components/container/Container";
import { ProductsRanking } from "@/components/productsRanking/ProductsRanking";
import PublicationDetails from "@/components/publicationDetails/PublicationDetails";
import QuickComparison from "@/components/quickComparison/QuickComparison";
import { useScroll } from "@/hooks/useScroll";
import { Product } from "@/types/product";

interface RankPageProps {
  id: number;
  title: string;
  intro: string;
  body: string;
  CreatedAt: string;
  UpdatedAt: string;
  products?: Product[];
  comparisonTitle?: string;
  comparisonSubTitle?: string;
  rankingTitle?: string;
}

const RankPage = ({
  title,
  intro,
  body,
  UpdatedAt,
  comparisonTitle,
  comparisonSubTitle,
  rankingTitle,
  products = [],
}: RankPageProps) => {
  const { elRefs, executeScroll, setRefs } = useScroll();

  return (
    <main className="rank-main-content">
      <Breadcrumbs currentPageTitle={title} />
      <Container size="xl">
        <div className="flex">
          <Container>
            <h1 className="page-title">{title}</h1>
            <PublicationDetails updateDate={UpdatedAt} />
            <div className="remote-text">
              <ReactMarkdown>{intro}</ReactMarkdown>
            </div>

            <QuickComparison
              title={comparisonTitle}
              subTitle={comparisonSubTitle}
              products={products}
              elRefs={elRefs}
              setRefs={setRefs}
              executeScroll={executeScroll}
            />

            <ProductsRanking title={rankingTitle} products={products} elRefs={elRefs} />

            <div className="mt-12 text-justify md:mt-[120px]">
              <div className="remote-text">
                <ReactMarkdown>{body}</ReactMarkdown>
              </div>
            </div>
            {/*<RankCards rankCards={rankCards} />*/}
          </Container>
          {/*{width > 1400 && <SideBar boundaryElement=".rank-main-content" bestVacuum={vacuumCleaners[0]} />}*/}
        </div>
      </Container>
    </main>
  );
};

export default RankPage;
