import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-season',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-season.html'
})
export class EditSeason {
  validationErrors: string[] = [];

  seasonId: number = 0;
  season = {
    name: '',
    startDate: '',
    endDate: '',
    priceFactor: 1.0
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.seasonId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSeason();
  }

  loadSeason() {
    this.http.get(`https://localhost:7235/api/Seasons/${this.seasonId}`).subscribe({
      next: (data: any) => {
        this.season = {
          name: data.name,
          startDate: data.startDate.substring(0, 10),
          endDate: data.endDate.substring(0, 10),
          priceFactor: data.priceFactor
        };
      },
      error: err => {
        alert('Failed to load season');
        console.error(err);
      }
    });
  }
onSubmit() {
  this.validationErrors = [];

  this.http.put(`https://localhost:7235/api/Seasons/${this.seasonId}`, this.season).subscribe({
    next: () => {
      alert('Season updated successfully!');
      this.router.navigate(['/dashboard/seasons']);
    },
    error: err => {
      console.error(err);

      if (err.status === 400 && err.error && err.error.errors) {
        const serverErrors = err.error.errors;
        for (let key in serverErrors) {
          if (serverErrors.hasOwnProperty(key)) {
            this.validationErrors.push(...serverErrors[key]);
          }
        }
      } else {
        this.validationErrors.push('An unexpected error occurred.');
      }
    }
  });
}





  cancel() {
    this.router.navigate(['/dashboard/seasons']);
  }
}
