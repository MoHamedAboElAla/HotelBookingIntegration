import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { About } from "./components/about/about";
import { FeaturedHotels } from "./components/featured-hotels/featured-hotels";
import { ContactUs } from "./components/contact-us/contact-us";
import { Footer } from "./components/footer/footer";
import { Home } from "./components/home/home";
import { Rooms } from './components/rooms/rooms';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet,RouterModule,Rooms],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('HotelBookingIntegration');
}
