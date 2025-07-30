import { Component, inject, OnInit, signal } from '@angular/core';
import { Hotel } from '../../../models/hotelModel';
import { Router } from '@angular/router';
import { HotelService } from '../../../services/hotelService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelList   {
// hotels: Hotel[] = [];
//   searchTerm: string = '';
//   page: number = 1;
//   pageSize: number = 10;
//   totalCount: number = 0;

//   constructor(private hotelService: HotelService, private router: Router) {}

//   ngOnInit() {
//     this.getHotels();
//   }
//   getHotels() {
//     const params = {
//       term: this.searchTerm,
//       page: this.page,
//       pageSize: this.pageSize,
//       sortBy: 'name',
//       sortDirection: 'asc'
//     };

//     this.hotelService.getHotels(params).subscribe(response => {
//       this.hotels = response.data;
//       this.totalCount = response.totalCount;
//     });
//   }
//   search() {
//     this.page = 1;
//     this.getHotels();
//   }

//    deleteHotel(id: number) {
//     if (confirm('هل أنت متأكد من حذف الفندق؟')) {
//       this.hotelService.deleteHotel(id).subscribe(() => {
//         this.getHotels();
//       });
//     }
//   }
//   showRooms(hotelId: number) {
//     this.router.navigate(['/dashboard/hotels', hotelId, 'rooms']);
//   }

//   editHotel(hotelId: number) {
//     this.router.navigate(['/dashboard/hotels/edit', hotelId]);
//   }
//   prevPage() {
//   this.page--;
//   this.getHotels();
// }
// nextPage() {
//   this.page++;
//   this.getHotels();
// }
private hotelService = inject(HotelService);
  private router = inject(Router);

  hotels = signal<Hotel[]>([]);
  searchTerm = signal('');
  page = signal(1);
  pageSize = 6;
   get filteredHotels() {
    const term = this.searchTerm().toLowerCase();
    return this.hotels().filter(h => h.name.toLowerCase().includes(term));
  }

  get pagedHotels() {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredHotels.slice(start, start + this.pageSize);
  }

  ngOnInit() {
    this.hotelService.getHotels().subscribe(data => this.hotels.set(data));
  }

  showRooms(hotelId: number) {
    this.router.navigate(['/rooms', hotelId]);
  }
   editHotel(hotelId: number) {
    this.router.navigate(['/hotels/edit', hotelId]);
  }

  deleteHotel(hotelId: number) {
    this.hotelService.deleteHotel(hotelId).subscribe(() => {
      this.hotels.set(this.hotels().filter(h => h.id !== hotelId));
    });
  }
  get maxPage() {
  return Math.ceil(this.filteredHotels.length / this.pageSize);
  }
  previousPage() {
    if (this.page() > 1) this.page.set(this.page() - 1);
  }

  nextPage() {
    const maxPage = Math.ceil(this.filteredHotels.length / this.pageSize);
    if (this.page() < maxPage) this.page.set(this.page() + 1);
  }
}
