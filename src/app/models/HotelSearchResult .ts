import { Hotel } from "./hotelModel";

export interface HotelSearchResult {
  data: Hotel[];
  totalCount: number;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}