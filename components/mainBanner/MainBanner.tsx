import React from "react";
import Image from "next/image";

import { Container } from "@/components/container/Container";

import "./mainBanner.style.scss";

interface MainBannerProps {
  title: string;
  body: string;
}

const MainBanner = (props: MainBannerProps) => {
  const { title, body } = props;

  return (
    <div className="main-banner">
      <Container className="main-banner__container">
        <div className="main-banner__content">
          <p className="main-banner__subtitle">Produkty marzeń</p>
          <h1 className="main-banner__title">{title}</h1>
          <p className="main-banner__body">{body}</p>
        </div>
      </Container>
      <Image
        priority={true}
        className="main-banner__image"
        src="/main-banner-bags.jpg"
        alt="Odkurzacz automatyczny na drewnianej podłodze."
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default MainBanner;
