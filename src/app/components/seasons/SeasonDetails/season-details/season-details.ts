// season-details.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './season-details.html'
})
export class SeasonDetails {
  seasonId: number = 0;
  season: any = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.seasonId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSeason();
  }

  loadSeason() {
    this.http.get(`https://localhost:7235/api/Seasons/${this.seasonId}`).subscribe({
      next: (data: any) => {
        this.season = data;
        this.cd.detectChanges(); // Force change detection after setting data
      },
      error: err => {
        this.errorMessage = 'Failed to load season data.';
        console.error(err);
      }
    });
  }

  back() {
    this.router.navigate(['/dashboard/seasons']);
  }
}
