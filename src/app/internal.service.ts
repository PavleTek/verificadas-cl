import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Girl, Service, SpecificLocation, PaymentTier, City } from './types';
import { formatGirlImagesToUrls, formatEconomicGirlNames, getImageUrlFromImageName } from './helper-functions';

interface BasicFilterOption {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class InternalService {
  private allGirls = new BehaviorSubject<Girl[]>([]);
  private activeGirl = new BehaviorSubject<Girl | null>(null);
  private premiumAndSpecialGirls = new BehaviorSubject<Girl[]>([]);
  private regularGirls = new BehaviorSubject<any[]>([]);
  private economicGirls = new BehaviorSubject<any[]>([]);
  private allServices = new BehaviorSubject<Service[]>([]);
  private allCities = new BehaviorSubject<City[]>([]);
  private activeCity = new BehaviorSubject<City | null>(null);
  private allSpecificLocations = new BehaviorSubject<SpecificLocation[]>([]);
  private selectedServices = new BehaviorSubject<Service[]>([]);
  private selectedSpecificLocations = new BehaviorSubject<SpecificLocation[]>([]);
  private selectedOtherFilters = new BehaviorSubject<BasicFilterOption[]>([]);
  private selectedCategory = new BehaviorSubject<string>('');
  allGirlsData = this.allGirls.asObservable();
  activeGirlData = this.activeGirl.asObservable();
  premiumAndSpecialGirlsData = this.premiumAndSpecialGirls.asObservable();
  regularGirlsData = this.regularGirls.asObservable();
  economicGirlsData = this.economicGirls.asObservable();
  allServicesData = this.allServices.asObservable();
  allCitiesData = this.allCities.asObservable();
  activeCityData = this.activeCity.asObservable();
  specificLocationsData = this.allSpecificLocations.asObservable();
  selectedServicesData = this.selectedServices.asObservable();
  selectedSpecificLocationsData = this.selectedSpecificLocations.asObservable();
  selectedOtherFiltersData = this.selectedOtherFilters.asObservable();
  selectedCategoryData = this.selectedCategory.asObservable();

  setGirlsInGroups(girls: Girl[], groupSize: number): any {
    let girlPair: Girl[] = [];
    let finalGirlPairArray: any = [];
    for (let girl of girls) {
      if (girlPair.length < groupSize) {
        girlPair.push(girl);
      } else {
        finalGirlPairArray.push(girlPair);
        girlPair = [girl];
      }
    }
    if (girlPair.length) {
      finalGirlPairArray.push(girlPair);
    }
    return finalGirlPairArray;
  }

  updateGirlData(data: Girl[]) {
    if (data.length) {
      const premiumAndSpecialGirls: Girl[] = [];
      let regularGirls: any[] = [];
      let economicGirls: any[] = [];
      data.forEach((girl: Girl) => {
        girl.profilePicture = getImageUrlFromImageName(girl.profilePicture);
        girl.images = formatGirlImagesToUrls(girl.images);
        if (girl.paymentTier === PaymentTier.SPECIAL && girl.images.active.length > 0) {
          premiumAndSpecialGirls.push(girl);
        } else if (girl.paymentTier === PaymentTier.PREMIUM && girl.images.active.length > 0) {
          premiumAndSpecialGirls.push(girl);
        } else if (girl.paymentTier === PaymentTier.REGULAR && girl.images.active.length > 0) {
          regularGirls.push(girl);
        } else if (girl.paymentTier === PaymentTier.ECONOMIC && girl.images.active.length > 0) {
          economicGirls.push(girl);
        }
      });
      regularGirls = this.setGirlsInGroups(regularGirls, 2);
      economicGirls = formatEconomicGirlNames(economicGirls);
      economicGirls = this.setGirlsInGroups(economicGirls, 3);
      this.allGirls.next(data);
      this.premiumAndSpecialGirls.next(premiumAndSpecialGirls);
      this.regularGirls.next(regularGirls);
      this.economicGirls.next(economicGirls);
    }
  }

  filterGirls(data: Girl[]) {
    const premiumAndSpecialGirls: Girl[] = [];
    let regularGirls: any[] = [];
    let economicGirls: any[] = [];
    if (data.length) {
      data.forEach((girl: Girl) => {
        if (girl.paymentTier === PaymentTier.PREMIUM || girl.paymentTier === PaymentTier.SPECIAL) {
          premiumAndSpecialGirls.push(girl);
        } else if (girl.paymentTier === PaymentTier.REGULAR) {
          regularGirls.push(girl);
        } else if (girl.paymentTier === PaymentTier.ECONOMIC) {
          economicGirls.push(girl);
        }
      });
      regularGirls = this.setGirlsInGroups(regularGirls, 2);
      economicGirls = this.setGirlsInGroups(economicGirls, 3);
    }
    this.premiumAndSpecialGirls.next(premiumAndSpecialGirls);
    this.regularGirls.next(regularGirls);
    this.economicGirls.next(economicGirls);
  }

  updateSelectedServices(data: Service[]) {
    this.selectedServices.next(data);
  }

  updateSelectedSpecificLocations(data: SpecificLocation[]) {
    this.selectedSpecificLocations.next(data);
  }

  updateSelectedOtherFilters(data: BasicFilterOption[]) {
    this.selectedOtherFilters.next(data);
  }

  updateServices(data: Service[]) {
    this.allServices.next(data);
  }

  udpateCities(data: City[]) {
    this.allCities.next(data);
  }

  updateActiveCity(data: City) {
    this.activeCity.next(data);
  }

  updateSpecificLocations(data: SpecificLocation[]) {
    this.allSpecificLocations.next(data);
  }

  updateSelectedCategory(data: string) {
    if (data === '') {
      this.selectedCategory.next('None');
    } else {
      this.selectedCategory.next(data);
    }
  }
}
