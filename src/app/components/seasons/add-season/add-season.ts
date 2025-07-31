import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-season',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-season.html',
  styleUrl: './add-season.css'
})
export class AddSeason {
  validationErrors: string[] = [];
  season = {
    name: '',
    startDate: '',
    endDate: '',
    priceFactor: 1.0,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.validationErrors = [];

    this.http.post('https://localhost:7235/api/Seasons', this.season).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/seasons']);
      },
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          for (let key in err.error.errors) {
            this.validationErrors.push(...err.error.errors[key]);
          }
          this.cd.detectChanges();
        } else if (err.error?.message) {
          this.validationErrors.push(err.error.message);
          this.cd.detectChanges();
        } else {
          this.validationErrors.push("An unexpected error occurred.");
          this.cd.detectChanges();
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/seasons']);
  }
}
