import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ContactUs } from './components/contact-us/contact-us';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { Dashboard } from './components/dashboard/dashboard';
import { Hotels } from './components/hotels/hotels';
// import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/seasons';
import { Bookings } from './components/bookings/bookings';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminGuard } from './services/admin-guard';
import { AgentGuard } from './services/agent-guard';
// import { RoomDetails } from './components/room-details/room-details';
// import { EditRoom } from './components/edit-room/edit-room';
import { Rooms } from './components/rooms/rooms';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AdminGuard],
    children: [
      { path: 'hotels', component: Hotels },
      { path: 'rooms', component: Rooms },
      //  { path: 'rooms/:id', component: RoomDetails },
      // { path: 'rooms/edit/:id', component: EditRoom },
      { path: 'seasons', component: Seasons },
      { path: 'bookings', component: Bookings },
    ]
  },

  // redirect root to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];