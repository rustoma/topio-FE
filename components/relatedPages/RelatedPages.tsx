import React from "react";
import Link from "next/link";

import { RelatedPages } from "@/types/page";

import "./relatedPages.style.scss";
interface RelatedPagesProps {
  relatedPages: RelatedPages[];
  pageIdToExclude: number;
}

const RelatedPages = ({ relatedPages, pageIdToExclude }: RelatedPagesProps) => {
  return (
    <div className="related-pages">
      <h3 className="related-pages__title">Strony powiązane</h3>
      <div>
        <div className="related-pages__group">
          <ul className="related-pages__group-list">
            {relatedPages
              .filter((page) => page.id !== pageIdToExclude)
              .map((page) => (
                <li key={page.id} className="related-pages__group-list-item">
                  <Link href={page.slug} className="related-pages__group-list-item-link">
                    {page.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelatedPages;
