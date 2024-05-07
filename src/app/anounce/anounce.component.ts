import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Title, Meta } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-anounce',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, InputMaskModule, ToastModule, InputTextareaModule, ButtonModule],
  templateUrl: './anounce.component.html',
  styleUrl: './anounce.component.scss',
  providers: [MessageService],
})
export class AnounceComponent {
  paymentTier: string = '';
  phoneNumber: string = '';
  name: string = '';
  email: string = '';
  message: string = '';
  paymentTierOptions: string[] = ['Premium', 'Intermedio', 'Economico'];
  selectedPaymentTierOption: string = this.paymentTierOptions[0];

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private messageService: MessageService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('Anunciate en verificadas.cl');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Solicita la publicación de tu perfil en nuestro sitio. Completa el formulario y aumenta tu visibilidad como escort verificada. Fácil, rápido y seguro.',
    });
    try {
      window.scrollTo(0, 0);
      const params = await firstValueFrom(this.route.params);
      if (params) {
        let paymentTier = params['paymentTier'];
        this.selectedPaymentTierOption = paymentTier;
      }
    } catch (error) {
      console.error('Error while trying to get payment tier from url', error);
    }
  }

  async anounce() {
    try {
      const anounceResponse = await this.mainService.sendAnounceRequest(this.name, this.email, this.phoneNumber, this.message, this.selectedPaymentTierOption);
      if (anounceResponse.status === 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: `Su postulacio ha sido enviada exitosamente. Pronto nos pondremos en contacto con usted`,
          life: 6000,
        });
        this.email = '';
        this.name = '';
        this.phoneNumber = '';
        this.name = '';
        this.message = '';
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error con su postulacion, porfavor intente nuevamente mas tarde',
          life: 6000,
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un error con su postulacion, porfavor intente nuevamente mas tarde',
        life: 6000,
      });
    }
  }
}
