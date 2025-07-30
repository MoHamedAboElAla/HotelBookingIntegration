import { Room } from "./roomModel";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  country: string;
  imageUrl: string;
  description: string;
  stars: number;
  rooms: Room[];
}
