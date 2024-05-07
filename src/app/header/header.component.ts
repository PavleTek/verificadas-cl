import { Component } from '@angular/core';
import { GirlCategory, City } from '../types';
import { MainService } from '../main.service';
import { InternalService } from '../internal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
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
      this.mainService.getGirlsByCityId(this.activeCity.id);
      this.router.navigate(['/escorts', this.activeCity.name]);
    }
  }

  goToHomeAndResetCategory() {
    this.internalService.updateSelectedCategory('');
    if (this.activeCity) {
      this.router.navigate(['/escorts', this.activeCity.name]);
    } else {
      this.router.navigate(['/escorts']);
    }
  }

  selectActiveCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = '';
      this.internalService.updateSelectedCategory('');
      if (this.activeCity !== undefined) {
        this.router.navigate(['/escorts', this.activeCity.name]);
      } else {
        this.router.navigate(['/escorts']);
      }
    } else {
      this.internalService.updateSelectedCategory(category);
      if (this.activeCity !== undefined) {
        this.router.navigate(['/escorts', this.activeCity.name]);
      } else {
        this.router.navigate(['/escorts']);
      }
    }
  }

  goToHomePage() {
    if (this.activeCity) {
      this.router.navigate(['/escorts', this.activeCity.name]);
    } else {
      this.router.navigate(['./escorts']);
    }
  }
}
