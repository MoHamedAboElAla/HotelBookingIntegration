import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})

export class Cart  implements OnInit{

  constructor(private http: HttpClient,private router: Router) { }

  private auth= inject(AuthService);
 private cdr = inject(ChangeDetectorRef); 
  ngOnInit(): void {
    this.LoadItemsCart();
  }
bookings: BookingCardView[] = [];
cartCount: number = 0;
LoadItemsCart() {
  const agentId = this.auth.getUserId();
  console.log('Agent ID:', agentId);

  if (!agentId) {
    alert("⚠️ لم يتم التعرف على المستخدم.");
    return;
  }

  const headers = new HttpHeaders({
    'X-Agent-Id': agentId.toString()
  });

  this.http.get<any[]>('https://localhost:7235/api/Cart', { headers }).subscribe(data => {
    this.bookings = data.map(b => ({
      bookingId: b.bookingId,
      hotelName: b.hotelName,
      roomNumber: b.roomNumber,
      roomType: b.roomType,
      checkInDate: b.checkInDate,
      checkOutDate: b.checkOutDate,
      totalPrice: b.totalPrice
    }));

  
    this.cdr.detectChanges(); 
  });
   
}
deleteBooking(bookingId: number) {
  if (confirm('هل أنت متأكد من حذف الحجز؟')) {
    const agentId = this.auth.getUserId();
    console.log('Agent ID:', agentId);

    if (!agentId) {
      alert("⚠️ لم يتم التعرف على المستخدم.");
      return;
    }

    const headers = new HttpHeaders({
      'X-Agent-Id': agentId.toString()
    });

    this.http.delete(`https://localhost:7235/api/Cart/${bookingId}`, { headers }).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.bookingId !== bookingId);
        this.cdr.detectChanges();
        this.LoadItemsCart(); 
      },
      error: (err) => {
        alert('لا يمكن حذف الحجز الذي بدأ بالفعل');
      }
    });

  }
}
getCartItemCount() {
  const agentId = this.auth.getUserId();

  if (!agentId) {
    alert("⚠️ لم يتم التعرف على المستخدم.");
    return;
  }

  const headers = new HttpHeaders({
    'X-Agent-Id': agentId.toString()
  });

  this.http.get<number>('https://localhost:7235/api/Cart/count', { headers })
    .subscribe({
      next: (count) => {
        console.log('عدد العناصر في السلة:', count);
        this.cartCount = count; 
      },
      error: (err) => {
        console.error('خطأ في جلب عدد العناصر', err);
      }
    });
}
get totalPrice(): number {
  return this.bookings.reduce((total, booking) => total + booking.totalPrice, 0);
}
  orderNow(){
     this.http.post<any>('https://localhost:7235/api/Cart/confirm', {})
      .subscribe({
        next: res => {
          alert(res.message || "✅ تم الدفع بنجاح.");
        
          this.router.navigate(['/payment-success']);
        },
        error: err => {
          alert("❌ فشل في تأكيد الحجز: " + (err.error || ''));
        }
      });

  }
 cancelBookings() {
  this.http.delete("https://localhost:7235/api/Cart/cancel", {})
    .subscribe({
      next: () => {
        alert("✅ تم إلغاء جميع الحجوزات.");
        this.LoadItemsCart(); 
      },
      error: (err) => {
        console.error(err);
        alert("❌ حدث خطأ أثناء الإلغاء.");
      }
    });
}

}
export interface BookingCardView {
   bookingId: number;
  hotelName: string;
  roomNumber: number;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}

