import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ContactUs } from './components/contact-us/contact-us';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { Dashboard } from './components/dashboard/dashboard';
import { Hotels } from './components/hotels/hotels';
import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/seasons';
import { Bookings } from './components/bookings/bookings';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminGuard } from './services/admin-guard';
import { AgentGuard } from './services/agent-guard';

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
      { path: 'seasons', component: Seasons },
      { path: 'bookings', component: Bookings },
    ]
  },

  // redirect root to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];