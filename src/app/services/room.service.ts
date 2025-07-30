import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/roomModel';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
   private baseUrl = 'https://localhost:7235/api/Hotels';

  constructor(private http: HttpClient) {}

  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/${hotelId}/rooms`);
  }
}