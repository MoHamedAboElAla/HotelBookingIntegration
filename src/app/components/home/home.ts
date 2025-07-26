import { Component } from '@angular/core';
import { About } from "../about/about";
import { Hero } from "../hero/hero";
import { FeaturedHotels } from "../featured-hotels/featured-hotels";
import { ContactUs } from "../contact-us/contact-us";

@Component({
  selector: 'app-home',
  imports: [About, Hero, FeaturedHotels, ContactUs],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
