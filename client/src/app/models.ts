export interface ApiResponse {
  route: string;
  method: string;
  data: ApiData;
}

export interface ApiData {
  msg?: string;
}