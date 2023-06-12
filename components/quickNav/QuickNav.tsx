import React from "react";
import Link from "next/link";

import { getPageByCategories } from "@/services/page";

import "./quickNav.style.scss";

const QuickNav = async () => {
  const categories = await getPageByCategories();

  return (
    <div className="quick-nav">
      <h3 className="quick-nav__title">Szybka nawigacja</h3>
      <div className="quick-nav__content">
        {categories.map((category) => (
          <div key={category.category_name} className="quick-nav__group">
            <h4 className="quick-nav__group-title">{category.category_name}</h4>
            <ul className="quick-nav__group-list">
              {category.pages &&
                category.pages.map((page) => (
                  <li key={page.id} className="quick-nav__group-list-item">
                    <Link href={page.slug} className="quick-nav__group-list-item-link">
                      {page.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickNav;
