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
                <p className="product__score-label">Ocena naszego eksperta:</p>
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
            {/*{vacuumCleaner.shopLinks && vacuumCleaner.shopLinks.length > 0 && (*/}
            {/*  <VacuumCleanerShopsWrap>*/}
            {/*    <VacuumCleanerShopTitle>Sprawdź ceny w sklepach</VacuumCleanerShopTitle>*/}
            {/*    <FlexWrapper justifyContent="center" wrap="wrap">*/}
            {/*      {vacuumCleaner.shopLinks.map((shopLink, index) => {*/}
            {/*        return (*/}
            {/*          <Link key={shopLink.id} href={shopLink.url} passHref>*/}
            {/*            <VacuumCleanerShopLink*/}
            {/*              rel="noopener nofollow"*/}
            {/*              target="_blank"*/}
            {/*              backgroundColor={shopLink.shop_link_type.color}*/}
            {/*              color={shopLink.shop_link_type.textColor}>*/}
            {/*              Sprawdź Cenę w {shopLink.shop_link_type.title}*/}
            {/*            </VacuumCleanerShopLink>*/}
            {/*          </Link>*/}
            {/*        );*/}
            {/*      })}*/}
            {/*    </FlexWrapper>*/}
            {/*  </VacuumCleanerShopsWrap>*/}
            {/*)}*/}
          </div>
        );
      })}
    </div>
  );
};
