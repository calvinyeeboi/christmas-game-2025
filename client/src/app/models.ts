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

export interface Item {
  [key: string]: any;
}

export interface Action {
  [key: string]: any;
}

export interface Rooms {
  [key: string]: {
    [key: string]: Room;
  };
}

export interface GameStatus {
  started: boolean;
}

export interface Room {
  id?: number;
  name?: string;
  players?: Player[];
  items?: Item[];
  actions?: Action[];
}