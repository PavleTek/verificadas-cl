import { Component } from '@angular/core';
import { Girl, Service, SpecificLocation, City, Ethnicity, Nationality } from '../types';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { InternalService } from '../internal.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { formatGirlImagesToUrls, formatName } from '../helper-functions';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ChipModule, TooltipModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
})
export class ProductGridComponent {
  premiumAndSpecialGirls: Girl[] = [];
  regularGirls: any[] = [];
  economicGirls: any[] = [];
  // Arrays For Links
  activeCity: City | any;
  links: (Service | Ethnicity | SpecificLocation | Nationality)[] = [];
  baseAccessUrl = environment.baseAccessUrl;

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
    // Filters No Especificar name to not display it, then sanitizes names for the sake of the link
    this.internalService.specificLocationsData.subscribe((data) => {
      if (data !== undefined) {
        const filteredData = data.filter((location) => location.name !== 'No Especificar');
        this.links = filteredData;
      }
    });
    // Gets the active city, this is important for the links
    this.internalService.activeCityData.subscribe((data) => {
      if (data) {
        const sanitizedCityName = data.name.replace(/\s+/g, '-');
        this.activeCity = data;
        this.activeCity.name = sanitizedCityName;
      }
    });
  }

  getLinkUrl(linkName: string) {
    const sanitizedCityName = this.activeCity.name.replace(/\s+/g, '-');
    const sanitizedLinkName = linkName.replace(/\s+/g, '-');
    return `${this.baseAccessUrl}/escorts/${sanitizedCityName}/ubicacion/${sanitizedLinkName}`;
  }
  // comment to trigger build

  goToGirlPage(girl: Girl) {
    const girlId = girl.id;
    this.router.navigate(['/escort-verificada', girlId]);
  }

  girlLink(girlId: number): string {
    return `https://verificadas.cl/escort-verificada/${girlId}`;
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
