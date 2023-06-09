import React, { RefObject } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { ProductFeatures } from "@/components/productFeatures/ProductFeatures";
import { Product } from "@/types/product";

import "./ProductRanking.style.scss";

interface ProductsRankingProps {
  title?: string;
  products: Product[];
  elRefs: React.MutableRefObject<(HTMLDivElement | React.RefObject<unknown>)[]>;
}

export const ProductsRanking = ({ title, products, elRefs }: ProductsRankingProps) => {
  return (
    <div>
      <h2 className="h2--line">{title ? title : "Zestawienie produktów"}</h2>
      {products.map((product, index) => {
        return (
          <div ref={elRefs.current[index] as RefObject<HTMLDivElement>} className="product" key={product.id}>
            <div className="product__top-bar">
              <div className="product__title-wrap">
                <span className="product__position">{index + 1}</span>
                <h3 className="product__title">{product.simplified_name}</h3>
              </div>

              <div className="product__score-wrap">
                <p className="product__score-label">Nasza ocena:</p>
                <div className="product__score">
                  <span className="product__score-value">{product.score.toFixed(1)}</span>
                  <span> / 10</span>
                </div>
              </div>
            </div>
            <div className="product__initial-text remote-text">
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
            <div className="product__content-wrap">
              <div className="product__image-wrap">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${product.main_image}`}
                  alt={""}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="product__content">
                <div>
                  <h4 className="product__alternative-title">Najważniejsze dane techniczne</h4>
                  <ProductFeatures features={product.features} />
                </div>
              </div>
            </div>
            {/*<VacuumCleanerProsConsWrap wrap="wrap">*/}
            {/*  <VacuumCleanerPros>*/}
            {/*    <VacuumCleanerAlternativeTitle>Zalety</VacuumCleanerAlternativeTitle>*/}
            {/*    <VacuumCleanerList>*/}
            {/*      {vacuumCleaner.pros.map((advantage) => (*/}
            {/*        <VacuumCleanerProsListItem key={advantage.id}>{advantage.advantage}</VacuumCleanerProsListItem>*/}
            {/*      ))}*/}
            {/*    </VacuumCleanerList>*/}
            {/*  </VacuumCleanerPros>*/}
            {/*  <VacuumCleanerCons>*/}
            {/*    <VacuumCleanerAlternativeTitle>Wady</VacuumCleanerAlternativeTitle>*/}
            {/*    <VacuumCleanerList>*/}
            {/*      {vacuumCleaner.cons.map((disadvantage) => (*/}
            {/*        <VacuumCleanerConsListItem key={disadvantage.id}>*/}
            {/*          {disadvantage.disadvantage}*/}
            {/*        </VacuumCleanerConsListItem>*/}
            {/*      ))}*/}
            {/*    </VacuumCleanerList>*/}
            {/*  </VacuumCleanerCons>*/}
            {/*</VacuumCleanerProsConsWrap>*/}

            <div className="product__shops-wrapper">
              <h4 className="product__shop-title">Sprawdź ceny w sklepach</h4>
              <div className="product__shop-links">
                <a
                  href={product.friendly_url_media_expert}
                  className="product__shop-link product__shop-link--mex"
                  target="_blank"
                  rel="noopener nofollow noreferrer">
                  Sprawdź cenę w Media Expert
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
