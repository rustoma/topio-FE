import React from "react";
import Link from "next/link";

import { getNewestRankings } from "@/services/page";

import "./newestRankings.style.scss";

export const NewestRankings = async () => {
  const rankings = await getNewestRankings();

  return (
    <div className="newest-rankings">
      <h2 className="newest-rankings__title">Najnowsze rankingi</h2>
      <div className="newest-rankings__items">
        {rankings.map((ranking) => (
          <Link key={ranking.id} href={ranking.slug} className="newest-rankings__item">
            {ranking.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
