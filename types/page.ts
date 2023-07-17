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
  is_published: boolean;
  queue_upd: boolean;
}

export interface RelatedPages {
  id: number;
  title: string;
  slug: string;
}

export interface CreatePageRequest {
  entry_data_url: string;
  title: string;
  product_name: string;
  slug: string;
  parent_page: number | null;
  product_category: number;
}
