import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room';
import { Room } from '../../models/room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css'],
  imports: [FormsModule,CommonModule],
})
export class Rooms implements OnInit {
  rooms: Room[] = [];
  errorMessage = '';
    private cdr = inject(ChangeDetectorRef); 


  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error loading rooms', error);
        this.errorMessage = 'Error loading rooms';
      }
    });
  }

  // viewRoomDetails(room: Room): void {
  //   // navigate to detail page with room ID
  //   this.router.navigate(['/rooms', room.id]);
  // }

editRoom(room: Room): void {
  
    this.router.navigate(['/edit-room', room.id]);
  }

  deleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          this.loadRooms(); // reload rooms after deletion
        },
        error: (err) => {
          console.error('Error deleting room', err);
          this.errorMessage = 'Failed to delete the room';
        }
      });
    }
  }

  bookRoom(room: Room): void {
    if (room.isAvailable) {
      alert(`Room ${room.roomNumber} has been booked!`);
      room.isAvailable = false;
      this.roomService.updateRoom(room.id, room).subscribe({
        next: () => this.loadRooms(),
        error: (err) => {
          console.error('Booking failed', err);
          this.errorMessage = 'Booking failed';
        }
      });
    } else {
      alert('Room is already booked!');
    }
  }
}
