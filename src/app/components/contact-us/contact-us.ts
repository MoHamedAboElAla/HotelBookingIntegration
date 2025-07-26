import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  companyName: string = '';
  email: string = '';
  message: string = '';
sendWhatsAppMessage(event:any) : void{
   event.preventDefault(); 

    const fullMessage = 
`🛎 Contact Request

 Company Name: ${this.companyName}
 Email: ${this.email}
 Message:
${this.message}`;

    const yourWhatsAppNumber = '201205400269';
    const whatsappLink = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(fullMessage)}`;

 
    window.open(whatsappLink, '_blank');
}
}
