import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ContactUs } from './components/contact-us/contact-us';
import { FeaturedHotels } from './components/featured-hotels/featured-hotels';
import { Dashboard } from './components/dashboard/dashboard';
import { Hotels } from './components/hotels/hotels';
import { Rooms } from './components/rooms/rooms';
import { Seasons } from './components/seasons/DisplaySeason/seasons';
import { Bookings } from './components/bookings/bookings';
import { AddSeason } from './components/seasons/add-season/add-season';
import { EditSeason } from './components/seasons/edit-season/edit-season';
import { SeasonDetails } from './components/seasons/SeasonDetails/season-details/season-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminGuard } from './services/admin-guard';
import { AgentGuard } from './services/agent-guard';

export const routes: Routes = [
{ path: 'home', component: Home },
{ path: '', component: Home },
{path: 'dashboard',component:Dashboard,
    children: [
        {path: 'hotels', component: Hotels},
        {path:'rooms',component:Rooms},
        {path: 'seasons', component:Seasons},
        { path: 'seasons/add-season', component: AddSeason },
        { path: 'seasons/edit/:id', component: EditSeason },
        { path: 'seasons/details/:id', component: SeasonDetails },
        {path: 'bookings', component: Bookings},
        { path: 'login', component: Login },
        { path: 'register', component: Register },
    ]},
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