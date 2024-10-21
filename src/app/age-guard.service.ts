import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AgeGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  canActivate(): boolean {
    if (!this.isBrowser) {
      // On the server (SSR), we allow the route to activate
      return true;
    }

    // Browser-only logic: Check the age verification flag from 'localStorage'
    const ageVerified = localStorage.getItem('ageVerified') === 'true';

    if (!ageVerified) {
      // Redirect to age verification if not verified
      this.router.navigate(['/age-verification']);
      return false;
    }

    return true;
  }
}
