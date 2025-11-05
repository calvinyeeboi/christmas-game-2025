export interface ApiResponse {
  route: string;
  method: string;
  data: ApiData;
}

export interface ApiData {
  [key: string]: any;
}

export interface Player {
  id: number;
  name: string;
  inventory: Inventory;
}

export interface Inventory {
  [key: string]: any;
}