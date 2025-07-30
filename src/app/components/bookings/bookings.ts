import { Component, inject, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';
import { Spinner } from "../spinner/spinner";

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, Spinner],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class Bookings implements OnInit {
  private bookingService = inject(BookingService);
<<<<<<< HEAD
    private cdr = inject(ChangeDetectorRef); // ✅

=======
    private cdr = inject(ChangeDetectorRef); 
    
>>>>>>> 10cae68921b9fabee8c4cc407c58a27700490cd0
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAllBookings().subscribe(data => {
<<<<<<< HEAD
          console.log("API Response: ", data);
      this.bookings = data;
      this.filteredBookings = data;

      this.cdr.detectChanges(); // ✅ أجبِر Angular يعيد التحديث
=======
          console.log("API Response: ", data); 
      this.bookings = data;
      this.filteredBookings = data;

            this.cdr.detectChanges(); 
>>>>>>> 10cae68921b9fabee8c4cc407c58a27700490cd0

    });
  }

  filterBookings() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(booking =>
      booking.agentName.toLowerCase().includes(term) ||
      booking.roomNumber.toString().includes(term) ||
      booking.totalPrice.toString().includes(term)
    );
  }

  deleteBooking(bookingId: number) {
  if (confirm('هل أنت متأكد من حذف الحجز؟')) {
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.bookingId !== bookingId);
        this.filterBookings();
      },
      error: (err) => {
        alert('لا يمكن حذف الحجز الذي بدأ بالفعل')
      }
    });
  }
}

}