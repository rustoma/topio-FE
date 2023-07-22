import React from "react";
import Link from "next/link";

import { Button } from "@/features/dashboard/components/button/Button";
import { Card } from "@/features/dashboard/components/card/Card";
import { Table } from "@/features/dashboard/components/table/Table";
import { TableHeader } from "@/features/dashboard/components/table/TableHeader";
import { TableHeading } from "@/features/dashboard/components/table/TableHeading";
import { TableRow } from "@/features/dashboard/components/table/TableRow";
import { TableRowItem } from "@/features/dashboard/components/table/TableRowItem";
import { ProductCategory } from "@/types/category";

import "./categoriesTable.style.scss";
interface CategoriesTableProps {
  categories: ProductCategory[];
}

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const sortByID = (a: ProductCategory, b: ProductCategory) => {
    return a.id - b.id;
  };

  const removeCategory = (id: number) => {
    console.log("Category to remove: ", id);
  };

  return (
    <Card>
      <div className="categories-table__actions">
        <Link passHref href="/dashboard/categories/create">
          <Button element="a">Dodaj kategorię</Button>
        </Link>
      </div>
      <Table>
        <thead>
          <TableHeader>
            <TableHeading>ID</TableHeading>
            <TableHeading>Name</TableHeading>
            <TableHeading>Edycja</TableHeading>
          </TableHeader>
        </thead>
        <tbody>
          {categories.sort(sortByID).map((category) => (
            <TableRow key={category.id}>
              <TableRowItem> {category.id}</TableRowItem>
              <TableRowItem> {category.name}</TableRowItem>

              <TableRowItem>
                <div>
                  <Button
                    size="sm"
                    onClick={() => {
                      console.log("Edit");
                    }}>
                    Edytuj
                  </Button>
                </div>

                <div>
                  <Button size="sm" onClick={() => removeCategory(category.id)}>
                    Usuń
                  </Button>
                </div>
              </TableRowItem>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
