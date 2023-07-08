"use client";

import React from "react";

import { Container } from "@/components/container/Container";
import { SideBar } from "@/features/dashboard/components/sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";

const ClientProtected = () => {
  const isAuthenticated = useAuth(true);

  if (!isAuthenticated) return <>Loading...</>;

  return (
    <>
      <main>
        <Container>
          <SideBar />
          <div>Content</div>
        </Container>
      </main>
    </>
  );
};

export default ClientProtected;
