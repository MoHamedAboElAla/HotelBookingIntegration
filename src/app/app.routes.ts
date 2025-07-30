import { HotelService } from './services/hotelService';
import { Routes } from '@angular/router';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { ContactUs } from './components/contact-us/contact-us';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
//import { Hotels } from './components/hotels/hotels';
import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/seasons';
import { Bookings } from './components/bookings/bookings';
import { HotelList } from './components/hotel/hotel-list/hotel-list';
import { HotelRooms } from './components/hotel/hotel-rooms/hotel-rooms';
import { NotFound } from './components/not-found/not-found';
import { Hotels } from './components/hotels/hotels';

export const routes: Routes = [
{ path: '', component: Home },
/*
{path: 'dashboard',component:Dashboard,
    children: [
       // {path: 'hotels', component: Hotels},
        { path: 'hotels', component: HotelList },
        { path: 'hotels/add', component: HotelForm },
        { path: 'hotels/edit/:id', component: HotelForm },
        { path: 'hotels/:id/rooms', component: HotelRooms },
        {path:'rooms',component:Rooms},
        {path: 'seasons', component:Seasons},
        {path: 'bookings', component: Bookings},
        {
        path: 'dashboard/hotels/edit/:id',
        loadComponent: () => import('./components/hotel/hotel-form/hotel-form').then(m => m.HotelForm)
        },
        {
        path: 'dashboard/hotels/create',
        loadComponent: () => import('./components/hotel/hotel-form/hotel-form').then(m => m.HotelForm)
        },
        {
        path: 'dashboard/hotels/:id/rooms',
        loadComponent: () => import('./components/hotel/hotel-rooms/hotel-rooms').then(m => m.HotelRooms)
        }

    ]}
    */
   /*
{
  path: 'dashboard',
  component: Dashboard,
  children: [
    { path: 'hotels', component: HotelList },
    {
      path: 'hotels/add',
      loadComponent: () => import('./components/hotel/hotel-form/hotel-form').then(m => m.HotelForm)
    },
    {
      path: 'hotels/edit/:id',
      loadComponent: () => import('./components/hotel/hotel-form/hotel-form').then(m => m.HotelForm)
    },
    {
      path: 'hotels/:id/rooms',
      loadComponent: () => import('./components/hotel/hotel-rooms/hotel-rooms').then(m => m.HotelRooms)
    },
    { path: 'rooms', component: Rooms },
    { path: 'seasons', component: Seasons },
    { path: 'bookings', component: Bookings }
  ]
}
*/
{
  path: 'dashboard',
  component: Dashboard,
  children: [
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
    { path: 'bookings', component: Bookings },
    
  ]
},
{
  path: 'hotels',
  component: Hotels
},
{
  path: 'hotelRooms/:id',
  component: HotelRooms
},

{ path: 'not-found', component: NotFound },
    { path: '**', redirectTo: 'not-found' }
];
