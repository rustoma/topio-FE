"use client";
import React, { MutableRefObject, useEffect } from "react";
import Image from "next/image";

import { Product } from "@/types/product";

import "./QuickComparison.style.scss";

interface ComparisonTableProps {
  title?: string;
  subTitle?: string;
  products: Product[];
  setRefs: (products: Product[]) => void;
  executeScroll: (ref: React.MutableRefObject<HTMLDivElement>) => void;
  elRefs: React.MutableRefObject<(HTMLDivElement | React.RefObject<unknown>)[]>;
}

const QuickComparison = ({ title, subTitle, products, elRefs, setRefs, executeScroll }: ComparisonTableProps) => {
  useEffect(() => {
    setRefs(products);
  }, [products]);

  return (
    <div className="quick-comparison">
      <h2 className="quick-comparison__title">{title ? title : "Szybkie porównanie produktów"}</h2>
      <p className="quick-comparison__para">
        {subTitle
          ? subTitle
          : "Poniższa porównywarka przedstawia szybki podgląd na najlepsze modele na rynku będące w naszym aktualnym zestawieniu."}
      </p>
      {products?.map((product, index) => {
        return (
          <div className="product-comparison" key={product.id}>
            <div className="product-comparison__image-wrapper">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${product.main_image}`}
                alt={""}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="product-comparison__title-wrap">
              <div>
                <p className="product-comparison__title-label">{index + 1} Miejsce</p>
                <h3 className="product-comparison__title">{product.simplified_name}</h3>
              </div>
            </div>
            <div className="product-comparison__score-wrapper">
              <div>
                <span className="product-comparison__score-label">Ocena:</span>
                <div className="product-comparison__score">
                  <span className="product-comparison__score-value">{product.score.toFixed(1)} </span>
                  <span> / 10</span>
                </div>
              </div>
            </div>
            <div className="product-comparison__review-wrapper">
              <button
                className="product-comparison__review-button"
                onClick={() => executeScroll(elRefs.current[index] as MutableRefObject<HTMLDivElement>)}>
                Recenzja
              </button>
            </div>
            {/*{product.shopLinks && (*/}
            {/*  <VacuumCleanerShopLinksWrap>*/}
            {/*    {vacuumCleaner.shopLinks.map((shopLink, index) => {*/}
            {/*      return (*/}
            {/*        <VacuumCleanerLinkWrap key={shopLink.id} textAlignSm={textAlignSm[index]}>*/}
            {/*          <Link href={shopLink.url} passHref>*/}
            {/*            <VacuumCleanerShopLink*/}
            {/*              rel="noopener nofollow"*/}
            {/*              target="_blank"*/}
            {/*              backgroundColor={shopLink.shop_link_type.color}*/}
            {/*              color={shopLink.shop_link_type.textColor}>*/}
            {/*              {shopLink.shop_link_type.title}*/}
            {/*            </VacuumCleanerShopLink>*/}
            {/*          </Link>*/}
            {/*        </VacuumCleanerLinkWrap>*/}
            {/*      );*/}
            {/*    })}*/}
            {/*  </VacuumCleanerShopLinksWrap>*/}
            {/*)}*/}
          </div>
        );
      })}
    </div>
  );
};

export default QuickComparison;
