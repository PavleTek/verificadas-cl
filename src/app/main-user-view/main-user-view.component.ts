import { firstValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalService } from '../internal.service';
import { MainService } from '../main.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { City, Girl, SeoCategory, Service, SpecificLocation } from '../types';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { FilterComponent } from '../filter/filter.component';
import { DividerModule } from 'primeng/divider';
import { environment } from '../../environments/environment';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main-user-view',
  standalone: true,
  imports: [DividerModule, FilterComponent, ProductGridComponent, ButtonModule, CommonModule, DialogModule],
  templateUrl: './main-user-view.component.html',
  styleUrl: './main-user-view.component.scss',
})
export class MainUserViewComponent {
  showAgeDialog: boolean = false;

  cities: City[] = [];
  activeCity: City | undefined;

  // Filter Logic
  allServices: Service[] = [];
  allSpecificLocations: Service[] = [];

  selectedServices: Service[] = [];
  selectedSpecificLocaitons: SpecificLocation[] = [];

  // Girl logic
  premiumAndSpecialGirls: Girl[] = [];
  regularGirls: any[] = [];
  economicGirls: any[] = [];
  allGirls: Girl[] = [];
  activeGirl: Girl | undefined = undefined;
  filteredGirls: Girl[] = [];

  // SEO Logic
  baseAccessUrl = environment.baseAccessUrl;
  allSeoCategories: SeoCategory[] = [];
  activeSpecificLocation: SpecificLocation | undefined = undefined;
  title: string = '';
  description: string = '';

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private internalService: InternalService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.internalService.allGirlsData.subscribe((data) => {
      if (data) {
        this.allGirls = data;
      }
    });
    this.internalService.premiumAndSpecialGirlsData.subscribe((data) => {
      if (data) {
        this.premiumAndSpecialGirls = data;
      }
    });
    this.internalService.regularGirlsData.subscribe((data) => {
      if (data) {
        this.regularGirls = data;
      }
    });
    this.internalService.economicGirlsData.subscribe((data) => {
      if (data) {
        this.economicGirls = data;
      }
    });
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
    this.internalService.allSeoCategoriesData.subscribe((data) => {
      if (data) {
        this.allSeoCategories = data;
      }
    });
    this.internalService.activeSpecificLocationData.subscribe((data) => {
      if (data) {
        this.activeSpecificLocation = data;
      }
    });
  }

  async activeCityInit() {
    try {
      const params = await firstValueFrom(this.route.params);
      if (params) {
        const cityName = params['cityName'];
        if (!this.activeCity) {
          if (cityName) {
            await this.mainService.getAndSetCityByName(cityName);
          }
        } else {
          if (this.activeCity && cityName && cityName !== this.activeCity.name) {
            await this.mainService.getAndSetCityByName(cityName);
          }
        }
      }
    } catch (error) {
      console.error('Error fwith active City logic', error);
    }
  }

  redirectToGoogle() {
    window.location.href = 'https://www.google.com';
  }

  getThrowBackLink() {
    if (this.activeCity) {
      const sanitizedCityName = this.activeCity.name.replace(/\s+/g, '-');
      return `${this.baseAccessUrl}/escorts/${sanitizedCityName}`;
    } else {
      return `${this.baseAccessUrl}/escorts/`
    }
  }

  setAgeConfirmation() {
    const now = new Date();
    const expiryTime = now.getTime() + 4 * 60 * 60 * 1000;
    const ageConfirmation = {
      value: true,
      expiry: expiryTime,
    };
    localStorage.setItem('ageConfirmation', JSON.stringify(ageConfirmation));
    this.showAgeDialog = false;
  }

  checkAgeConfirmation() {
    const ageConfirmation = localStorage.getItem('ageConfirmation');
    if (ageConfirmation) {
      const parsed = JSON.parse(ageConfirmation);
      const now = new Date().getTime();
      if (parsed.expiry > now) {
        this.showAgeDialog = false;
      } else {
        this.showAgeDialog = true;
        localStorage.removeItem('ageConfirmation');
      }
    } else {
      this.showAgeDialog = true;
    }
  }

  updateTitleandMetaDescription(title: string | undefined, description: string | undefined) {
    console.log('this is being called');
    if (title && description) {
      console.log('this is happening');
      this.title = title;
      this.description = description;
      this.titleService.setTitle(title);
      this.metaService.updateTag({
        name: 'description',
        content: description,
      });
    }
  }

  async ngOnInit() {
    // have to update this based on city, category, and specific location once I get them
    this.titleService.setTitle('Escorts verificadas Santiago');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explora escorts verificadas en Santiago. Perfiles verificados, las mejores acompañantes en Santiago Oriente.',
    });
    this.checkAgeConfirmation();
    try {
      if (this.allGirls.length <= 1) {
        const params = await firstValueFrom(this.route.params);
        const childParams = await firstValueFrom(this.route.firstChild?.params || this.route.params);

        let cityName = params['cityName'];
        let locationName = childParams['locationName'];
        let categoryName = childParams['categoryName'];

        if (cityName) cityName = cityName.replace(/-/g, ' ');
        if (locationName) locationName = locationName.replace(/-/g, ' ');
        if (categoryName) categoryName = categoryName.replace(/-/g, ' ');

        if (params) {
          if (locationName) {
            await this.mainService.initiateEverythingBySpecificLocation(cityName, locationName);
            if (this.activeSpecificLocation) {
              this.updateTitleandMetaDescription(this.activeSpecificLocation.metaTitle, this.activeSpecificLocation.metaDescription);
            }
          } else if (categoryName) {
            await this.mainService.initiateEverythingByCategory(cityName, categoryName);
            if (this.allSeoCategories) {
              console.log(this.allSeoCategories);
              const selectedCategory = this.allSeoCategories.find((category) => category.name.toLowerCase() === categoryName.toLowerCase());
              if (selectedCategory) {
                this.updateTitleandMetaDescription(selectedCategory.metaTitle, selectedCategory.metaDescription);
              }
            }
          } else if (cityName) {
            await this.mainService.initiateEverythingByCity(cityName);
            if (this.activeCity) {
              this.updateTitleandMetaDescription(this.activeCity.metaTitle, this.activeCity.metaDescription);
            }
          } else {
            this.mainService.initiateEverything();
          }
        } else {
          this.mainService.initiateEverything();
        }
      }
    } catch (error) {
      console.error('Error loading all data', error);
    }
  }
}
