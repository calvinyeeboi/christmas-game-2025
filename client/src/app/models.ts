export type level = 'LEVEL_1' | 'LEVEL_2';

export interface ApiResponse {
  route: string;
  method: string;
  data: ApiData;
}

export interface ApiData {
  [key: string]: any;
}

export interface GameStatus {
  started: boolean;
}

export interface Player {
  id: number;
  name: string;
  isAdmin?: boolean;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  playerId: number;
  player?: Player;
}

export interface Action {
  [key: string]: any;
}

export interface House {
  [key: string]: Level
}

export interface Level {
  name: string;
  rooms: {
    [key: string]: Room,
  };
}

export interface Room {
  id?: number;
  name?: string;
  players?: Player[];
  items?: Item[];
  actions?: Action[];
  limit?: number;
}