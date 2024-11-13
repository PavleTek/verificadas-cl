import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { InternalService } from '../internal.service';
import { MainService } from '../main.service';
import { Girl } from '../types';
import { firstValueFrom } from 'rxjs';

export const girlPageResolver: ResolveFn<Promise<Girl | null>> = async (route: ActivatedRouteSnapshot) => {
  const internalService = inject(InternalService);
  const mainService = inject(MainService);
  const router = inject(Router);

  try {
    let allGirls = await firstValueFrom(internalService.allGirlsData);
    // Get the girl ID from the route parameters
    const girlId = parseInt(route.paramMap.get('id') || '', 10);
    if (!girlId) {
      router.navigate(['/escorts']);
      return null;
    }

    // Initiate data if not already loaded
    if (allGirls.length <= 1) {
      await mainService.initiateEverythingGirlPage(girlId);
    }

    allGirls = await firstValueFrom(internalService.allGirlsData);
    const girl = allGirls.find((g) => g.id === girlId);
    if (girl) {
      return girl;
    } else {
      router.navigate(['/escorts']);
      return null;
    }
  } catch (error) {
    console.error('Error in resolver:', error);
    router.navigate(['/escorts']);
    return null;
  }
};
