import React from "react";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Container } from "@/components/container/Container";

export const metadata: Metadata = {
  title: "Cookies - topio.pl",
  robots: "nofollow, noindex",
};
const Cookies = () => {
  return (
    <>
      <main>
        <Breadcrumbs />
        <Container>
          <h1 className="page-title">Informacje O Cookies</h1>
          <h2>1 Najważniejsze Informacje</h2>
          <ol>
            <li>
              Serwis https://topio.pl używa plików „cookies”. Brak zmiany po stronie Usługobiorcy ustawień przeglądarki
              jest równoznaczny z wyrażeniem zgody na ich użycie.
            </li>
            <li>
              Instalacja plików „cookies” jest konieczna do prawidłowego świadczenia usług w Serwisie. W plikach
              „cookies” znajdują się informacje niezbędne do prawidłowego funkcjonowania serwisu, w szczególności tych
              wymagających autoryzacji.
            </li>
            <li>
              W ramach serwisu https://topio.pl stosowane są trzy rodzaje plików „cookies”: „sesyjne”, „stałe” oraz
              „analityczne”.
              <ul>
                <li>
                  „Cookies” „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Usługobiorcy
                  do czasu wylogowania (opuszczenia Serwisu).
                </li>
                <li>
                  „Stałe” pliki „cookies” przechowywane są w urządzeniu końcowym Usługobiorcy przez czas określony w
                  parametrach plików „cookies” lub do czasu ich usunięcia przez Usługobiorcę.
                </li>
                <li>
                  „Cookies” „analityczne” umożliwiają lepsze poznanie sposobu interakcji Usługobiorcy w zakresie
                  zawartości Serwisu, lepiej zorganizować jego układ. ”Analityczne” „cookies” gromadzą informacje o
                  sposobie korzystania ze Serwisu przez Usługobiorcę, typie strony, z jakiej Usługobiorca został
                  przekierowany, oraz liczbie odwiedzin i czasie wizyty Usługobiorcy na stronie Serwisu. Informacje te
                  nie rejestrują konkretnych danych osobowych Usługobiorcy, lecz służą do opracowania statystyk
                  korzystania z Serwisu.
                </li>
              </ul>
            </li>
            <li>
              Usługobiorca ma prawo zadecydowania w zakresie dostępu plików „cookies” do swojego komputera poprzez ich
              uprzedni wybór w oknie swojej przeglądarki. Szczegółowe informacje o możliwości i sposobach obsługi plików
              „cookies” dostępne są w ustawieniach oprogramowania (przeglądarki internetowej).
            </li>
          </ol>
          <h2>2 Technologie Śledzące</h2>
          <ol>
            <li>
              Zgoda Na Cookies
              <br />
              Podczas pierwszej wizyty na stronie wyświetlana jest Ci informacja na temat stosowania plików cookies.
              Zawsze możesz zmienić ustawienia cookies z poziomu swojej przeglądarki albo w ogóle usunąć pliki cookies.
              Przeglądarki zarządzają ustawieniami cookies na różne sposoby. W menu pomocniczym przeglądarki
              internetowej znajdziesz wyjaśnienia dotyczące zmiany ustawień cookies. Pamiętaj, że wyłączenie lub
              ograniczenie obsługi plików cookies może powodować trudności w korzystaniu z serwisu topio.pl, a także z
              wielu innych stron internetowych, które stosują cookies.
            </li>
            <li>
              Cookies Własne
              <br />
              Cookies własne serwis wykorzystuje w celu zapewnienia prawidłowego działania strony.
            </li>
            <li>
              Cookies Podmiotów Trzecich
              <br />
              Universal Analytics(_ga) – Plik używany jest do rozróżniania użytkowników. <br />
              Universal Analytics(_gid) – Plik używany jest do rozróżniania użytkowników.
              <br />
              Universal Analytics(_gat) – Plik używany jest do kontrolowania liczby zapytań przeglądarki użytkownika do
              serwera.
              <br />
              Google Analytics(__utma) – Plik używany jest do rozróżniania użytkowników i sesji. Plik odświeża się za
              każdym razem, gdy dane wysyłane są do Google Analytics.
              <br />
              Google Analytics(__utmt) – Plik używany jest do kontrolowania liczby zapytań przeglądarki użytkownika do
              serwera.
              <br />
              Google Analytics(__utmb) – Plik używany jest do ustalania nowych użytkowników i sesji. Plik odświeża się
              za każdym razem, gdy dane wysyłane są do Google Analytics.
              <br />
              Google Analytics(__utmc) – Plik używany jest do ustalania czy użytkownik wykonał nową sesję/wizytę. Plik
              nie jest używany w ga.js.
              <br />
              Google Analytics(__utmz) – Plik przechowuje informację o źródle lub kampani, dzięki której użytkownik
              trafił na stronę.
              <br />
              Google Analytics(__utmv) – Plik przechowuje informację o niestandardowych zmiennych dotyczących poziomu
              użytkownika. Plik odświeża się za każdym razem gdy dane wysyłane są do Google Analytics.
              <br />
              <br />
              Narzędzia społecznościowe – W serwisie topio.pl używane są wtyczki i inne narzędzia społecznościowe
              udostępniane przez serwisy społecznościowe, takie jak Facebook, Twitter, Instagram, Google, LinkedIN.
              <br />
              <br />
              Logi serwera – Korzystanie ze strony wiąże się z przesyłaniem zapytań do serwera, na którym przechowywana
              jest strona. Każde zapytanie skierowane do serwera zapisywane jest w logach serwera.
              <br />
              Logi obejmują m.in. Twój adres IP, datę i czas serwera, informacje o przeglądarce internetowej i systemie
              operacyjnym z jakiego korzystasz. Logi zapisywane i przechowywane są na serwerze.
              <br /> Dane zapisane w logach serwera nie są kojarzone z konkretnymi osobami korzystającymi ze strony i
              nie są wykorzystywane przez serwis w celu Twojej identyfikacji.
              <br /> Logi serwera stanowią wyłącznie materiał pomocniczy służący do administrowania stroną, a ich
              zawartość nie jest ujawniana nikomu poza osobami upoważnionymi do administrowania serwerem.
              <br />
            </li>
          </ol>
        </Container>
      </main>
    </>
  );
};

export default Cookies;
