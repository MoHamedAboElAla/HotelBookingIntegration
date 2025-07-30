export interface Room {
  id: number;
  roomNumber: number;
  roomType: string;
  pricePerNight: number;
  isAvailable: boolean;
  description: string;
  imageUrl: string;
}