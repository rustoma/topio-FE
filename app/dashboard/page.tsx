"use client";

import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { Container } from "@/components/container/Container";
import useAuth from "@/hooks/useAuth";

const ClientProtected = () => {
  const isAuthenticated = useAuth(true);

  if (!isAuthenticated) return <>Loading...</>;

  return (
    <>
      <main>
        <Breadcrumbs />
        <Container>
          <h1 className="page-title">ClientProtected</h1>
        </Container>
      </main>
    </>
  );
};

export default ClientProtected;
