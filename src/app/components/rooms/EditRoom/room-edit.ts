import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './room-edit.html',
  styleUrl: './room-edit.css'
})
export class EditRoom implements OnInit {
  roomId!: number;
  room: any = {
    roomNumber: 0,
    roomType: '',
    pricePerNight: 0,
    description: '',
    isAvailable: true,
    hotelId: 0
  };
  hotels: any[] = [];
  selectedImage: File | null = null;
  validationErrors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

 ngOnInit() {
  this.roomId = Number(this.route.snapshot.paramMap.get('id'));

  // Load hotels first
  this.http.get('https://localhost:7235/api/Hotels').subscribe({
    next: (data: any) => {
      this.hotels = data;
        console.log('Loaded Room:', this.room);
      this.cd.detectChanges();

      // load room data
      this.http.get(`https://localhost:7235/api/Rooms/${this.roomId}`).subscribe({
          next: (data: any) => {
            this.room = {
              roomNumber: data.roomNumber,
              roomType: data.roomType,
              pricePerNight: data.pricePerNight,
              description: data.description,
              isAvailable: data.isAvailable,
              hotelId: data.hotelId  
            };
            this.cd.detectChanges();
          },
        error: () => this.validationErrors.push('Failed to load room data.')
      });
    },
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

    this.http.put(`https://localhost:7235/api/Rooms/${this.roomId}`, formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/rooms']),
        this.cd.detectChanges();
      },
      error: (err) => {
  this.validationErrors = [];

  if (err.status === 400) {
    if (typeof err.error === 'string') {
      this.validationErrors.push(err.error);
    } else if (err.error?.error) {
      this.validationErrors.push(err.error.error);
    } else if (err.error?.errors) {
      for (let key in err.error.errors) {
        this.validationErrors.push(...err.error.errors[key]);
      }
    } else {
      this.validationErrors.push("Bad Request occurred.");
    }
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
