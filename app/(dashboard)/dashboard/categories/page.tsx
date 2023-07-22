"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/features/dashboard/components/button/Button";

const Categories = () => {
  return (
    <>
      <main>
        <Link passHref href="/dashboard/categories/create">
          <Button element="a">Dodaj kategorię</Button>
        </Link>
      </main>
    </>
  );
};

export default Categories;
