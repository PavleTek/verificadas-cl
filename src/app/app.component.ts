import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Location } from '@angular/common';
import { MainService } from './main.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InternalService } from './internal.service';
import { City } from './types';
import { FooterComponent } from './footer/footer.component';
import { EntryComponent } from './entry/entry.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HttpClientModule, HeaderComponent, EntryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private location: Location,
    private mainService: MainService,
    private internalService: InternalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.internalService.allCitiesData.subscribe((data) => {
      if (data) {
        this.cities = data;
      }
    });
  }

  title = 'Verificadas';
  entryConfirmation = false;
  cities: City[] = [];

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const currentUrl = this.location.path();
      if (currentUrl.includes('/home') && this.entryConfirmation) {
        let cityParamIndex = currentUrl.indexOf('/home/') + '/home/'.length;
        if (cityParamIndex !== -1 && cityParamIndex < currentUrl.length) {
          const cityName = currentUrl.substring(cityParamIndex);
          await this.mainService.initiateEverythingByCity(cityName);
        } else {
          await this.mainService.initiateEverything();
        }
        // this.entryConfirmation = true;
      } else if (!currentUrl.includes('/home') && !currentUrl.includes('/lady') && this.cities.length === 0) {
        this.mainService.getAllCities();
      }

      // Check if entryConfirmation is stored in localStorage and is not expired
      const entryConfirmationStatus = localStorage.getItem('entryConfirmation');
      if (entryConfirmationStatus) {
        const entryConfirmationData = JSON.parse(entryConfirmationStatus);
        const currentTime = new Date().getTime();
        if (currentTime - entryConfirmationData.timestamp < 3600000) {
          // 3600000 milliseconds = 1 hour
          this.entryConfirmation = entryConfirmationData.value;
        } else {
          localStorage.removeItem('entryConfirmation'); // Remove expired entryConfirmation
        }
      }
    }
  }

  confirmEntry(): void {
    this.entryConfirmation = true;
    this.router.navigate(['/home']);

    // Store entryConfirmation status in localStorage with timestamp
    const entryConfirmationData = {
      value: this.entryConfirmation,
      timestamp: new Date().getTime(),
    };
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('entryConfirmation', JSON.stringify(entryConfirmationData));
    }
  }
}
