import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  mail: string = 'Contacto@Verificadas.cl';

  constructor(private titleService: Title, private metaService: Meta, @Inject(PLATFORM_ID) private platformId: Object) {}

  sendWhatsapp() {
    const phoneNumber = '56936696411';
    const message = 'Hola, tengo una consulta con su pagina Verificadas.cl, me podrian ayudar?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    if (isPlatformBrowser(this.platformId)) {
      window.open(whatsappUrl, '_blank');
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Contacto Verificadas');
    this.metaService.updateTag({
      name: 'description',
      content:
        '¿Eres escort y buscas colaboración? Contáctanos para unirte a nuestro exclusivo equipo de profesionales verificados. Garantizamos discreción y profesionalismo.',
    });
  }
}
