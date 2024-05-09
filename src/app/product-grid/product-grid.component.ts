import { Component } from '@angular/core';
import { Girl } from '../types';
import { InternalService } from '../internal.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatGirlImagesToUrls, formatName } from '../helper-functions';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
})
export class ProductGridComponent {
  premiumAndSpecialGirls: Girl[] = [];
  regularGirls: any[] = [];
  economicGirls: any[] = [];

  constructor(private internalService: InternalService, private router: Router) {
    this.internalService.premiumAndSpecialGirlsData.subscribe((data) => {
      if (data !== undefined) {
        this.premiumAndSpecialGirls = data;
      }
    });
    this.internalService.regularGirlsData.subscribe((data) => {
      if (data !== undefined) {
        this.regularGirls = data;
      }
    });
    this.internalService.economicGirlsData.subscribe((data) => {
      if (data !== undefined) {
        this.economicGirls = data;
      }
    });
  }

  goToGirlPage(girl: Girl) {
    const girlId = girl.id;
    console.log('hello');
    this.router.navigate(['/escort-verificada', girlId]);
  }

  getMiniDescriptionText(girl: Girl): string {
    let minidescription = `Ubicacion: ${girl.specificLocation}`;
    if (girl.parking) {
      minidescription += '\n';
      minidescription += ' Cuenta con estacionamiento';
    }
    return minidescription;
  }

  formatPrice(price: Number) {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return '$ ' + formattedPrice;
  }

  getAgeFromBday(bday: Date | string) {
    if (!(bday instanceof Date)) {
      bday = new Date(bday);
    }
    const today = new Date();
    const bdayDateFormat = new Date(bday);
    let age = today.getFullYear() - bdayDateFormat.getFullYear();
    const monthDiff = today.getMonth() - bday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    return age;
  }

  formatName(name: string) {
    return formatName(name);
  }

  showSpecificLocation(girl: Girl) {
    const specificLocation = girl.specificLocation;
    return specificLocation !== null && specificLocation !== undefined && specificLocation.name !== 'No Especificar';
  }
}
