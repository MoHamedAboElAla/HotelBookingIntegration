// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  bookingId: number;
  checkIn: string;
  checkOut: string;
  agentName: string;
  agentEmail: string;
  roomNumber: number;
  roomType: string;
  roomPrice: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7235/api/Booking';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

deleteBooking(bookingId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${bookingId}`);
}
}