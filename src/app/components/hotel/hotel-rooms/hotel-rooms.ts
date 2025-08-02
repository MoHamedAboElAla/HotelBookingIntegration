import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../../models/room';


@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hotel-rooms.html',
  styleUrl: './hotel-rooms.css'
})
export class HotelRooms implements OnInit {
 
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);
  private cdr = inject(ChangeDetectorRef);
  hotelId!: number;
  rooms: any[] = [];
  loading = true;
    constructor(public authSer:AuthService,private http:HttpClient){

  }
 
  ngOnInit() {

  this.route.paramMap.subscribe(params => {
    this.hotelId = Number(params.get('id'));
    console.log('hotelId from route:', this.hotelId);

    this.loading = true;
    this.roomService.getRoomsByHotelId(this.hotelId).subscribe({
      next: (data) => {
        console.log('Rooms data:', data);
        this.rooms = data;
        console.log('Rooms stored in component:', this.rooms);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load rooms', err);
        this.loading = false;
         this.cdr.detectChanges(); 
      }
    });
  });
}

  onImageError(event: Event) {
  (event.target as HTMLImageElement).src = '/images/no-image.jfif'; 
}


  bookRoom(room: any) {
        const agentId = this.authSer.getUserId();
        console.log('Agent ID:', agentId);
if (!agentId) {
  alert("⚠️ لم يتم التعرف على المستخدم.");
  return;
}
    if (!room.startDate || !room.endDate) {
      alert("يرجى اختيار تواريخ الوصول والمغادرة.");
      return;
    }
    const bookingDto = {
      roomId: room.id,
      startDate: room.startDate,
      endDate: room.endDate
    };
 this.http.post(`https://localhost:7235/api/Booking/Book`, bookingDto).subscribe({
  next: () => {
    alert("✅ تم الحجز بنجاح!");
    room.isAvailable = false;
    console.log("Booking successful for room:", bookingDto.roomId);
  

  },
  error: (err) => {
    console.error(err);
    alert("❌ فشل في الحجز.");
  }
});
  }

}
