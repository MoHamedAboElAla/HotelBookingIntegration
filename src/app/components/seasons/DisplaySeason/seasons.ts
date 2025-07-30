import { Component, OnInit } from '@angular/core';
import { ISeason } from '../../../models/iseason';
import { SeasonService } from '../../../services/season';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './seasons.html',
  styleUrl: './seasons.css'
})
export class Seasons implements OnInit {
  seasons: ISeason[] = [];

  constructor(private seasonService: SeasonService) {}

  ngOnInit(): void {
    this.loadSeasons();
  }

  loadSeasons(): void {
    this.seasonService.getAll().subscribe({
      next: (data) => this.seasons = data,
      error: (err) => console.error(err)
    });
  }

  deleteSeason(id: number): void {
    if (confirm("Are you sure you want to delete this season?")) {
      this.seasonService.delete(id).subscribe(() => {
        this.loadSeasons();
      });
    }
  }
}
