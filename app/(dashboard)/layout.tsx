import React, { ReactNode } from "react";

import { DashboardLayout } from "@/features/dashboard/components/layout/DashboardLayout";

const Layout = ({ children }: { children: ReactNode }) => <DashboardLayout>{children}</DashboardLayout>;

export default Layout;
