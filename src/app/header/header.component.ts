import { Component } from '@angular/core';
import { GirlCategory, City } from '../types';
import { MainService } from '../main.service';
import { InternalService } from '../internal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, RippleModule, FormsModule, CommonModule, StyleClassModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cities: City[] = [];
  activeCity: City | any;
  activeCategory: string = '';
  barbieCategory: string = GirlCategory.BARBIE;
  milfCategory: string = GirlCategory.MADURAS;
  massageCategory: string = GirlCategory.MASAJISTAS;
  baseAccessUrl = environment.baseAccessUrl;
  constructor(private internalService: InternalService, private route: ActivatedRoute, private router: Router, private mainService: MainService) {
    this.internalService.allCitiesData.subscribe((data) => {
      if (data) {
        this.cities = data;
      }
    });
    this.internalService.activeCityData.subscribe((data) => {
      if (data) {
        this.activeCity = data;
      }
    });
    this.internalService.selectedCategoryData.subscribe((data) => {
      if (data) {
        this.activeCategory = data;
      }
    });
  }

  updateActiveCity() {
    if (this.activeCity) {
      this.internalService.updateActiveCity(this.activeCity);
      this.internalService.updateSelectedCategory('');
      this.mainService.getGirlsByCityId(this.activeCity.id);
      if (this.activeCity.name !== 'Santiago') {
        const sanitizedCityName = this.activeCity.name.replace(/\s+/g, '-');
        this.router.navigate(['/escorts', sanitizedCityName]);
      } else {
        this.router.navigate(['/escorts']);
      }
    }
  }

  getLinkUrl(linkName: string) {
    let sanitizedCityName = 'Santiago';
    if (this.activeCity) {
      sanitizedCityName = this.activeCity.name.replace(/\s+/g, '-');
    }
    const sanitizedLinkName = linkName.replace(/\s+/g, '-');
    return `${this.baseAccessUrl}/escorts/${sanitizedCityName}/categoria/${sanitizedLinkName}`;
  }

  getHomePageLink() {
    let sanitizedCityName = 'Santiago';
    if (this.activeCity) {
      sanitizedCityName = this.activeCity.name.replace(/\s+/g, '-');
    }
    return `${this.baseAccessUrl}/escorts/${sanitizedCityName}`;
  }
}
