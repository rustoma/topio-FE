import { Product } from "@/types/product";

export interface Page {
  id: number;
  title: string;
  product_name: string;
  intro: string;
  body: string;
  slug: string;
  entry_data_url: string;
  parent_page: number;
  features: any[];
  products: Product[];
  product_category: number;
  created_at: Date;
  updated_at: Date;
}

export interface RelatedPages {
  id: number;
  title: string;
  slug: string;
}
