import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../services/room';
import { Room } from '../../../models/room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css'],
  imports: [FormsModule,CommonModule, RouterLink],
})
export class Rooms implements OnInit {
  rooms: Room[] = [];
  errorMessage = '';

  constructor(private roomService: RoomService,
     private router: Router,
      private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading rooms', error);
        this.errorMessage = 'Error loading rooms';
      }
    });
  }

  deleteRoom(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomService.deleteRoom(id).subscribe({
          next: () => {
            this.loadRooms();
            Swal.fire('Deleted!', 'Room has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting room', err);
            Swal.fire('Error', 'Failed to delete the room', 'error');
          }
        });
      } 
    });
  }


}
