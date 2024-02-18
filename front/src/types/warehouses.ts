export interface Warehouse {
  id: string;
  name: string;
  description: string;
  size: number;
}
export interface Warehouses {
  warehouses: Warehouse[];
}
