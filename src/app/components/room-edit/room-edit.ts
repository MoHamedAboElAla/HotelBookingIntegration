import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-edit.html',
  styleUrls: ['./room-edit.css']
})
export class RoomEdit implements OnInit {
  room: Room = {
    id: 0,
    roomNumber: 0,
    roomType: '',
    pricePerNight: 0,
    description: '',
    imageUrl: '',
    isAvailable: false
  };

  successMessage: string = '';

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roomId = +this.route.snapshot.paramMap.get('id')!;
    this.getRoomById(roomId);
  }

  getRoomById(id: number): void {
    this.roomService.getRoomById(id).subscribe({
      next: (data) => {
        this.room = data;
      },
      error: (err) => {
        console.error('Error fetching room:', err);
      }
    });
  }

  onSubmit(): void {
    this.roomService.updateRoom(this.room.id, this.room).subscribe({
      next: () => {
        this.successMessage = 'Room updated successfully!';
        setTimeout(() => this.router.navigate(['/rooms']), 2000);
      },
      error: (err) => {
        console.error('Error updating room:', err);
      }
    });
  }
}
