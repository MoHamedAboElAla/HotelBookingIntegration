import { Routes } from '@angular/router';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { ContactUs } from './components/contact-us/contact-us';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { Hotels } from './components/hotels/hotels';
import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/DisplaySeason/seasons';
import { Bookings } from './components/bookings/bookings';
import { AddSeason } from './components/seasons/add-season/add-season';
import { EditSeason } from './components/seasons/edit-season/edit-season';
import { SeasonDetails } from './components/seasons/SeasonDetails/season-details/season-details';

export const routes: Routes = [
{ path: '', component: Home },
{path: 'dashboard',component:Dashboard,
    children: [
        {path: 'hotels', component: Hotels},
        {path:'rooms',component:Rooms},
        {path: 'seasons', component:Seasons},
        { path: 'seasons/add-season', component: AddSeason },
        { path: 'seasons/edit/:id', component: EditSeason },
        { path: 'seasons/details/:id', component: SeasonDetails },
        {path: 'bookings', component: Bookings}
    ]}

];
