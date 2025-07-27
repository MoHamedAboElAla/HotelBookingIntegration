import { Routes } from '@angular/router';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { ContactUs } from './components/contact-us/contact-us';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { Hotels } from './components/hotels/hotels';
import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/seasons';
import { Bookings } from './components/bookings/bookings';

export const routes: Routes = [
{ path: '', component: Home },
{path: 'dashboard',component:Dashboard,
    children: [
        {path: 'hotels', component: Hotels},
        {path:'rooms',component:Rooms},
        {path: 'seasons', component:Seasons},
        {path: 'bookings', component: Bookings}
    ]}

];
