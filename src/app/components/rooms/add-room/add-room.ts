import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css'
})
export class AddRoom  implements OnInit {
  validationErrors: string[] = [];
  hotels: any[] = [];
  room = {
    roomNumber: 0,
    roomType: '',
    pricePerNight: 0,
    description: '',
    isAvailable: true,
    hotelId: 0
  };

  selectedImage: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.http.get('https://localhost:7235/api/Hotels').subscribe({
    next: (data: any) => this.hotels = data,
    error: () => this.validationErrors.push('Failed to load hotels list.')
  });
}
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

  onSubmit() {
    this.validationErrors = [];

    const formData = new FormData();
    formData.append('roomNumber', this.room.roomNumber.toString());
    formData.append('roomType', this.room.roomType);
    formData.append('pricePerNight', this.room.pricePerNight.toString());
    formData.append('description', this.room.description);
    formData.append('isAvailable', this.room.isAvailable.toString());
    formData.append('hotelId', this.room.hotelId.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (!this.room.hotelId || this.room.hotelId === 0) {
  this.validationErrors.push("Please select a hotel.");
  return;
}
    this.http.post('https://localhost:7235/api/Rooms', formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/rooms']);
      },
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          for (let key in err.error.errors) {
            this.validationErrors.push(...err.error.errors[key]);
          }
        } else if (err.error?.message) {
          this.validationErrors.push(err.error.message);
        } else {
          this.validationErrors.push("An unexpected error occurred.");
        }
        this.cd.detectChanges();
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/rooms']);
  }
}
