import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  mail: string = 'Contacto@Verificadas.cl';
  sendWhatsapp() {
    const phoneNumber = '56936696411';
    const message = 'Hola, tengo una consulta con su pagina Verificadas.cl, me podrian ayudar?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
