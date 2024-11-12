import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MainService } from '../main.service';

export const mainUserViewResolver: ResolveFn<Promise<void>> = async (route, state) => {
  const mainService = inject(MainService);

  // Determine if we're on the parent or child route
  const isParentRoute = !route.parent;

  // For the parent route, `cityName` is in `route.params`
  const cityName = isParentRoute ? route.params['cityName']?.replace(/-/g, ' ') : route.parent?.params['cityName']?.replace(/-/g, ' ');

  const locationName = route.params['locationName']?.replace(/-/g, ' ');
  const categoryName = route.params['categoryName']?.replace(/-/g, ' ');

  console.log(cityName, locationName, categoryName, 'city location category');

  if (cityName && locationName) {
    console.log('initiate city specific location')
    return mainService.initiateEverythingBySpecificLocation(cityName, locationName);
  } else if (cityName && categoryName) {
    console.log('initiate city category')
    return mainService.initiateEverythingByCategory(cityName, categoryName);
  } else if (cityName) {
    console.log('initiate city only')
    return mainService.initiateEverythingByCity(cityName);
  } else {
    console.log('initiate by nothing')
    return mainService.initiateEverything();
  }
};
