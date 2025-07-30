import { HotelService } from './services/hotelService';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ContactUs } from './components/contact-us/contact-us';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { Dashboard } from './components/dashboard/dashboard';
//import { Hotels } from './components/hotels/hotels';
import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/DisplaySeason/seasons';
import { Bookings } from './components/bookings/bookings';

import { HotelList } from './components/hotel/hotel-list/hotel-list';
import { HotelRooms } from './components/hotel/hotel-rooms/hotel-rooms';
import { NotFound } from './components/not-found/not-found';
import { Hotels } from './components/hotels/hotels';

import { AddSeason } from './components/seasons/add-season/add-season';
import { EditSeason } from './components/seasons/edit-season/edit-season';
import { SeasonDetails } from './components/seasons/SeasonDetails/season-details/season-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminGuard } from './services/admin-guard';
import { AgentGuard } from './services/agent-guard';
import { Profile } from './components/profile/profile';
import { ProfileGuard } from './services/profile-guard';

export const routes: Routes = [

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AdminGuard],
    children: [
//       { path: 'hotels', component: Hotels },
      { path: 'hotels', component: HotelList },

    {
      path: 'hotels/add',
      loadComponent: () =>
        import('./components/hotel/hotel-form/hotel-form').then(m => m.HotelForm)
    },
    {
      path: 'hotels/edit/:id',
      loadComponent: () =>
        import('./components/hotel/hotel-form/hotel-form').then(m => m.HotelForm)
    },
    {
      path: 'hotels/:id/rooms',
      loadComponent: () =>
        import('./components/hotel/hotel-rooms/hotel-rooms').then(m => m.HotelRooms)
    },
      { path: 'rooms', component: Rooms },
      { path: 'seasons', component: Seasons },
       { path: 'seasons/add-season', component: AddSeason },
        { path: 'seasons/edit/:id', component: EditSeason },
        { path: 'seasons/details/:id', component: SeasonDetails },
      { path: 'bookings', component: Bookings },
    ]
  },
<<<<<<< HEAD

{ path: 'profile', component: Profile, canActivate: [ProfileGuard] },

=======
  
{
  path: 'hotels',
  component: Hotels
},
{
  path: 'hotelRooms/:id',
  component: HotelRooms
},
  // redirect root to home
>>>>>>> 10cae68921b9fabee8c4cc407c58a27700490cd0
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

