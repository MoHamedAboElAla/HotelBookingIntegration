import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotelModel';

// export interface Hotel {
//   id: number;
//   name: string;
//   location: string;
//   description: string;
//   imageUrl: string;
// }

export interface HotelQuery {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
}


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'https://localhost:7235/api/Hotels';

  constructor(private http: HttpClient) {}

  getHotels(query: HotelQuery = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      if (query[key as keyof HotelQuery] != null) {
        params = params.set(key, query[key as keyof HotelQuery]!);
      }
    });
    return this.http.get(this.baseUrl, { params });
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`);
  }


  createHotel(hotel: FormData): Observable<any> {
  return this.http.post(this.baseUrl, hotel);
}

updateHotel(id: number, hotel: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, hotel);
}

  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getRoomsByHotel(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${hotelId}/rooms`);
  }
}
