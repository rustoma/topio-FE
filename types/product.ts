export interface Product {
  id: number;
  name: string;
  simplified_name: string;
  description: string;
  url: string;
  orderWeight: number;
  score: number;
  main_image: string;
  page_id: number;
  features: string;
  createdAt: Date;
  updatedAt: Date;
}
