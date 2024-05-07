import { firstValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalService } from '../internal.service';
import { MainService } from '../main.service';
import { CommonModule } from '@angular/common';
import { City, Girl, Service, SpecificLocation } from '../types';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { FilterComponent } from '../filter/filter.component';
import { DividerModule } from 'primeng/divider';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main-user-view',
  standalone: true,
  imports: [DividerModule, FilterComponent, ProductGridComponent, CommonModule],
  templateUrl: './main-user-view.component.html',
  styleUrl: './main-user-view.component.scss',
})
export class MainUserViewComponent {
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

  async ngOnInit() {
    this.titleService.setTitle('Escorts verificadas Santiago');
    this.metaService.updateTag({ name: 'description', content: 'Explora escorts verificadas en Santiago. Perfiles verificados, las mejores acompañantes en Santiago Oriente.' });
    try {
      if (this.allGirls.length <= 1) {
        const params = await firstValueFrom(this.route.params);
        if (params) {
          const cityName = params['cityName'];
          if (cityName) {
            await this.mainService.initiateEverythingByCity(cityName);
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
