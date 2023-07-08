"use client";

import React, { ReactNode } from "react";

import { Container } from "@/components/container/Container";
import Header from "@/features/dashboard/components/header/Header";
import { SideBar } from "@/features/dashboard/components/sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";

import "./dashboardLayout.style.scss";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuth(true);

  if (!isAuthenticated) return <>Loading...</>;

  return (
    <div className="dashboard-layout">
      <Container className="container--dashboard">
        <div className="dashboard-layout__wrapper">
          <div className="dashboard-layout__sidebar">
            <SideBar />
          </div>
          <div className="dashboard-layout__content">
            <Header />
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};
