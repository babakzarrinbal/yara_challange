export interface Product {
  id: string;
  name: string;
  description: string;
  size: number;
  isHazardous: boolean;
}
export interface Products {
  products: Product[];
}
