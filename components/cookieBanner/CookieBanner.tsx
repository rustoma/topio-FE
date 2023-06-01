"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "./cookieBanner.style.scss";

const CookieBanner = () => {
  const [isCookieConsent, setIsCookieConsent] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    setIsCookieConsent(!!cookieConsent);
  }, []);

  return (
    <>
      {!isCookieConsent ? (
        <div className="cookie-banner">
          <div className="cookie-banner__content">
            <p>
              Strona korzysta z ciasteczek, aby świadczyć usługi na najwyższym poziomie. Dalsze korzystanie ze strony
              oznacza, że zgadzasz się na ich użycie zgodnie z{" "}
              <Link href="/polityka-prywatnosci-i-cookies">Polityką prywatności</Link> oraz akceptujesz{" "}
              <Link href="/regulamin">Regulamin Strony.</Link>
            </p>
          </div>

          <div className="cookie-banner__buttons-wrapper">
            <button
              className="cookie-banner__button"
              onClick={() => {
                localStorage.setItem("cookieConsent", "true");
                setIsCookieConsent(true);
              }}>
              Akceptuję
            </button>
            <button
              className="cookie-banner__button cookie-banner__button--decline"
              onClick={() => router.push("https://google.com")}>
              Nie akceptuję i opuszczam serwis
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CookieBanner;
