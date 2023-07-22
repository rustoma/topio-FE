import React from "react";
import ReactMarkdown from "react-markdown";

import { Container } from "@/components/container/Container";
import MainBanner from "@/components/mainBanner/MainBanner";
import { NewestRankings } from "@/components/newestRankings/NewestRankings";
import QuickNav from "@/components/quickNav/QuickNav";

import "./page.style.scss";

export default function Home() {
  return (
    <main>
      <MainBanner
        title="Nie wiesz jaki Produkt kupić ?"
        body="Jesteś we właściwym miejscu ! Zapewniamy wiarygodne recenzje, przewodniki kupującego i porady dotyczące wyboru najlepszych produktów."
      />
      <Container>
        <div className="home__section">
          <div className="remote-text">
            <ReactMarkdown>{`Witaj na naszej niezwykłej stronie, gdzie czeka na Ciebie niezliczona gama rankingów produktów. 
            
Pragniemy Cię oczarować i pomóc w znalezieniu najlepszego produktu, który idealnie pasuje do Twoich potrzeb.

Czy kiedykolwiek zastanawiałeś się, jak wiele możliwości drzemie na rynku? Jak znaleźć ten jedyny, wyjątkowy produkt, który spełni Twoje oczekiwania? Czy pragniesz odkryć coś wyjątkowego, co nada blasku Twojemu życiu?

Oto miejsce, które stworzyliśmy dla Ciebie! Nasza strona pełna pasjonujących rankingów pomoże Ci w wyborze idealnego produktu. 

Pragniemy, abyś doświadczył przyjemności odkrywania i zyskał pewność, że dokonujesz najlepszego wyboru.

Dzięki naszym rankingom i recenzjom, pokażemy Ci świat pełen możliwości.

Razem odkryjemy najwyższej jakości produkty, które spełnią Twoje marzenia. Nie zwlekaj! Rozpocznij tę fascynującą przygodę!`}</ReactMarkdown>
          </div>
          {/*@ts-expect-error Server Component*/}
          <QuickNav />
        </div>
        <div className="home__section">
          <div className="remote-text">
            <ReactMarkdown>{`## Nowości

Czy zastanawiałeś się kiedyś, jakie są najnowsze trendy w świecie produktów? Czy chcesz być na bieżąco z tym, co jest na topie? 

W naszej sekcji “Nowości” znajdziesz najświeższe rankingi produktów, które pozwolą Ci być zawsze o krok przed innymi. 

Dlaczego warto śledzić nasze nowości? 

Ponieważ dzięki temu będziesz miał dostęp do najnowszych informacji i będziesz mógł podejmować świadome decyzje zakupowe. Czy nie warto wiedzieć, co jest najlepsze na rynku? Zapraszamy do zapoznania się z naszą sekcją i odkrywania nowych trendów!`}</ReactMarkdown>
          </div>
          {/*@ts-expect-error Server Component*/}
          <NewestRankings />
        </div>
        <div className="home__section">
          <div className="remote-text">
            <ReactMarkdown>{`Już teraz wkraczasz na terytorium ekscytujących rankingów, gdzie czeka na Ciebie świat pełen możliwości. 
            
Zaufaj nam, gdy mówimy, że warto skorzystać z naszej strony. 

Dlaczego? 

Bo z nami odkryjesz sekrety najlepszych produktów, które spełnią Twoje oczekiwania!

Czy zdarza Ci się czuć przytłoczony mnogością opcji? 

Właśnie dlatego jesteśmy tutaj, aby Ci pomóc! Nasze rankingi są stworzone po to, by uprościć Ci życie i dać Ci pewność, że wybierasz najwyższej jakości produkty, które spełnią Twoje potrzeby. 

Nie musisz już tracić czasu i energii na szukanie igły w stogu siana – my już to dla Ciebie zrobiliśmy!`}</ReactMarkdown>
          </div>
        </div>
      </Container>
    </main>
  );
}
