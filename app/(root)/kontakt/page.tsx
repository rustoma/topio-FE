import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Container } from "@/components/container/Container";

export const metadata = {
  title: "Kontakt - topio.pl",
};
const ContactPage = () => {
  return (
    <>
      <main>
        <Breadcrumbs />
        <Container>
          <h1 className="page-title">Kontakt</h1>
          <div>
            <p>Masz pomysł, jak moglibyśmy udoskonalić nasz serwis ? A może chciałbyś nawiązać współpracę ?</p>
            <p>
              Zachęcamy do skontaktowania się z nami poprzez e-mail:{" "}
              <a href="mailto:biuro.topio@gmail.com" className="link-inline">
                biuro.topio@gmail.com
              </a>
            </p>
            Twój głos jest dla nas ważny, a Twoje uwagi pomagają nam stale doskonalić jakość naszego serwisu.
            <p>Dziękujemy za odwiedzenie naszego serwisu. Postaramy się odpowiedzieć najszybciej jak to możliwe.</p>
          </div>
        </Container>
      </main>
    </>
  );
};

export default ContactPage;
