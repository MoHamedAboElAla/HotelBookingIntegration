import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';


@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [CommonModule],
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
  //  ngOnInit() {
  //   this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
  //   console.log('hotelId from route:', this.hotelId); 

  //   this.roomService.getRoomsByHotelId(this.hotelId).subscribe({
  //     next: (data) => {
  //       console.log('Rooms data:', data);
  //       this.rooms = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load rooms', err);
  //       this.loading = false;
  //     }
  //   });
  // }
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
}
