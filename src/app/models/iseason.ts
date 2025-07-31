export interface ISeason {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  priceFactor: number;
  bookingIds: number[];
}
