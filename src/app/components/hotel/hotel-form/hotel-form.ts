import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/hotelService';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hotel-form.html',
  styleUrl: './hotel-form.css'
})
export class HotelForm  implements OnInit{
private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private hotelService = inject(HotelService);
  submitted = false;
private toastr = inject(ToastrService);
constructor(private http: HttpClient) { }
  form!: FormGroup;
  hotelId: number | null = null;
  isEdit = false;
  selectedImageFile!: File;
  imagePreview: string | null = null;
/*
   ngOnInit(){
    this.form = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    country: ['', Validators.required],
    description: ['', Validators.required],
    stars: [1, Validators.required],
    imageUrl: ['']
});

}

*/
/*
save() {
  if (this.form.invalid) return;

  const formData = new FormData();
  formData.append('Name', this.form.get('name')?.value);
  formData.append('Location', this.form.get('location')?.value);
  formData.append('Country', this.form.get('country')?.value);
  formData.append('Description', this.form.get('description')?.value);
  formData.append('Stars', this.form.get('stars')?.value);

  if (!this.isEdit && !this.selectedImageFile) {
    alert("Please select an image.");
    return;
  }

  if (this.selectedImageFile) {
    formData.append('ImageFile', this.selectedImageFile);
  }

  const request = this.isEdit
    ? this.hotelService.updateHotel(this.hotelId!, formData)
    : this.hotelService.createHotel(formData);

  request.subscribe(() => {
    this.router.navigate(['/dashboard/hotels']);
  });
}
*/
/*
ngOnInit() {
  this.form = this.fb.group({
    name: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    country: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    imageUrl: ['']
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  this.hotelId = idParam ? Number(idParam) : null;

  if (this.hotelId && !isNaN(this.hotelId)) {
    this.isEdit = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (hotel) => {
        this.form.patchValue({
          name: hotel.name,
          location: hotel.location,
          country: hotel.country,
          description: hotel.description,
          stars: hotel.stars,
          imageUrl: hotel.imageUrl
        });

        this.imagePreview = hotel.imageUrl;
      },
      error: (err) => {
        console.error('Error loading hotel:', err);
        this.router.navigate(['/dashboard/hotels']); // يرجّع المستخدم لو حصل خطأ
      }
    });
  } else {
    this.isEdit = false;
  }
}
*/
/*
ngOnInit() {
  this.form = this.fb.group({
    name: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    country: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    imageUrl: ['']
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  this.hotelId = idParam && !isNaN(+idParam) ? +idParam : null;

  // ✅ لو id مش رقم أو مش موجود
  if (idParam && isNaN(+idParam)) {
    console.warn('Invalid hotelId provided.');
    this.router.navigate(['/dashboard/hotels']);
    return;
  }

  if (this.hotelId) {
    this.isEdit = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (hotel) => {
        this.form.patchValue({
          name: hotel.name,
          location: hotel.location,
          country: hotel.country,
          description: hotel.description,
          stars: hotel.stars,
          imageUrl: hotel.imageUrl
        });
        this.imagePreview = hotel.imageUrl;
      },
      error: (err) => {
        console.error('Error loading hotel:', err);
        this.router.navigate(['/dashboard/hotels']);
      }
    });
  } else {
    this.isEdit = false;
  }
}
*/
/*
ngOnInit() {
  this.form = this.fb.group({
    name: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    country: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    imageUrl: ['']
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  this.hotelId = idParam && !isNaN(+idParam) ? +idParam : null;

  // ✅ التحقق من أن ID رقم صالح
  if (idParam && isNaN(+idParam)) {
    this.toastr.error('Invalid hotel ID!', 'Error');
    this.router.navigate(['/dashboard/hotels']);
    return;
  }

  if (this.hotelId) {
    this.isEdit = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (hotel) => {
        this.form.patchValue({
          name: hotel.name,
          location: hotel.location,
          country: hotel.country,
          description: hotel.description,
          stars: hotel.stars,
          imageUrl: hotel.imageUrl
        });
        this.imagePreview = hotel.imageUrl;
      },
      error: (err) => {
        console.error('Error loading hotel:', err);
        this.toastr.error('Hotel not found or an error occurred.', 'Error');
        this.router.navigate(['/dashboard/hotels']);
      }
    });
  } else {
    this.isEdit = false;
  }
}
*/
/*
save() {
  this.submitted = true; 
  if (this.form.invalid) {
    this.form.markAllAsTouched();  // يفعّل كل رسائل الخطأ
    return;
  }

  const formData = new FormData();
  formData.append('Name', this.form.get('name')?.value);
  formData.append('Location', this.form.get('location')?.value);
  formData.append('Country', this.form.get('country')?.value);
  formData.append('Description', this.form.get('description')?.value);
  formData.append('Stars', this.form.get('stars')?.value);

  if (!this.isEdit && !this.selectedImageFile) {
    alert("Please select an image.");
    return;
  }

  if (this.selectedImageFile) {
    formData.append('ImageFile', this.selectedImageFile);
  }

  const request = this.isEdit
    ? this.hotelService.updateHotel(this.hotelId!, formData)
    : this.hotelService.createHotel(formData);

  request.subscribe({
  next: () => {
    this.router.navigate(['/dashboard/hotels']);
  },
  error: (err) => {
    //console.error('Validation Errors from API:', err.error.errors);
    console.error('Validation Errors from API:', err.error.errors);
    this.toastr.error('Validation failed. Please check your data.', 'Error');
    // تقدر هنا تعرض الأخطاء للمستخدم لو حبيت
  }
});
}
*/
/*
ngOnInit() {
  this.form = this.fb.group({
    name: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    country: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    imageUrl: ['']
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  this.hotelId = idParam && !isNaN(+idParam) ? +idParam : null;

  // 🔴 إذا الـ ID موجود لكنه ليس رقمًا صالحًا
  if (idParam && isNaN(+idParam)) {
    this.toastr.error('Invalid hotel ID!', 'Error');
    this.router.navigate(['/dashboard/hotels']);
    return;
  }

  // 🟢 إذا الـ hotelId صالح (Edit Mode)
  if (this.hotelId) {
    this.isEdit = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (hotel) => {
        this.form.patchValue({
          name: hotel.name,
          location: hotel.location,
          country: hotel.country,
          description: hotel.description,
          stars: hotel.stars,
          imageUrl: hotel.imageUrl
        });
        this.imagePreview = hotel.imageUrl;
      },
      error: (err) => {
        console.error('Error loading hotel:', err);
        this.toastr.error('Hotel not found or an error occurred.', 'Error');
        this.router.navigate(['/dashboard/hotels']);
      }
    });
  } else {
    // ➕ Create Mode
    this.isEdit = false;
  }
}
*/
ngOnInit() {
  this.form = this.fb.group({
    name: ['', Validators.required],
    location: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    country: ['', Validators.required],
    description: ['', Validators.required],
    stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    imageUrl: ['']
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  this.hotelId = idParam && !isNaN(+idParam) ? +idParam : null;

  if (idParam && isNaN(+idParam)) {
    this.router.navigate(['/not-found']);
    return;
  }

  if (this.hotelId) {
    this.isEdit = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (hotel) => {
        this.form.patchValue({
          name: hotel.name,
          location: hotel.location,
          country: hotel.country,
          description: hotel.description,
          stars: hotel.stars,
          imageUrl: hotel.imageUrl
        });

        this.imagePreview = `http://localhost:7235/images/${hotel.imageUrl}`;
      },
      error: () => {
        this.router.navigate(['/not-found']);
      }
    });
  } else {
    this.isEdit = false;
  }
}
save() {
  this.submitted = true;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('Name', this.form.get('name')?.value);
  formData.append('Location', this.form.get('location')?.value);
  formData.append('Country', this.form.get('country')?.value);
  formData.append('Description', this.form.get('description')?.value);
  formData.append('Stars', this.form.get('stars')?.value);

  

  if (this.selectedImageFile) {
    formData.append('ImageFile', this.selectedImageFile);
  }

  const request = this.isEdit
    ? this.hotelService.updateHotel(this.hotelId!, formData)
    : this.hotelService.createHotel(formData);

  request.subscribe({
    next: () => {
      this.router.navigate(['/dashboard/hotels']);
    },
   error: (err) => {
  console.error('Full error:', err);
  const validationErrors = err.error?.errors;

  if (validationErrors) {
    const messages = Object.values(validationErrors).flat();
    alert("Validation errors:\n" + messages.join('\n'));
  } else if (err.status === 0) {
    alert("Cannot connect to the server.");
  } else {
    alert("An error occurred while saving the hotel. Please try again.");
  }
}

  });
}

/*
save() {
  this.submitted = true;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('Name', this.form.get('name')?.value);
  formData.append('Location', this.form.get('location')?.value);
  formData.append('Country', this.form.get('country')?.value);
  formData.append('Description', this.form.get('description')?.value);
  formData.append('Stars', this.form.get('stars')?.value);

  if (!this.isEdit && !this.selectedImageFile) {
    this.toastr.warning("Please select an image before saving.", "Warning");
    return;
  }

  if (this.selectedImageFile) {
    formData.append('ImageFile', this.selectedImageFile);
  }

  const request = this.isEdit
    ? this.hotelService.updateHotel(this.hotelId!, formData)
    : this.hotelService.createHotel(formData);

  request.subscribe({
    next: () => {
      const message = this.isEdit ? 'Hotel updated successfully.' : 'Hotel created successfully.';
      this.toastr.success(message, 'Success');
      this.router.navigate(['/dashboard/hotels']);
    },
    error: (err) => {
      console.error('Validation Errors from API:', err.error?.errors ?? err);
      this.toastr.error('An error occurred while saving the hotel.', 'Error');
    }
  });
}
*/

  cancel() {
    this.router.navigate(['/dashboard/hotels']);
  }


onImageSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput?.files?.[0];

  if (file) {
    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}



}
