import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotelService';
import { Router, RouterModule } from '@angular/router';
import { Hotel } from '../../models/hotelModel';

@Component({
  selector: 'app-hotels',
  imports: [RouterModule],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css'
})
export class Hotels {
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
  //  editHotel(hotelId: number) {
  //   this.router.navigate(['/hotels/edit', hotelId]);
  // }
  // deleteHotel(hotelId: number) {
  //   this.hotelService.deleteHotel(hotelId).subscribe(() => {
  //     this.hotels.set(this.hotels().filter(h => h.id !== hotelId));
  //   });
  // }
}
