import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ISeason } from '../../../models/iseason';
import { SeasonService } from '../../../services/season';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './seasons.html',
  styleUrl: './seasons.css'
})
export class Seasons implements OnInit {
  seasons: ISeason[] = [];
private cdr = inject(ChangeDetectorRef);
  constructor(private seasonService: SeasonService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSeasons();
  }

  loadSeasons(): void {
    this.seasonService.getAll().subscribe({
      next: (data) => this.seasons = data,
      error: (err) => console.error(err),
      complete: () => this.cdr.detectChanges()
    });
  }

  deleteSeason(id: number) {
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
      this.http.delete(`https://localhost:7235/api/Seasons/${id}`).subscribe({
        next: () => {
          this.loadSeasons();
          Swal.fire(
            'Deleted!',
            'Season has been deleted.',
            'success'
          );
        },
        error: err => {
          Swal.fire('Error', 'Failed to delete season', 'error');
        }
      });
    }
  });
}

  
}
