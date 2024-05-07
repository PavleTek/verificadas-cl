import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AgeGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    if (!isBrowser) {
      this.router.navigate(['/age-verification']);
      return false;
    }

    // Check the age verification flag from 'localStorage'
    const ageVerified = localStorage.getItem('ageVerified') === 'true';

    // Redirect to age verification if not verified
    if (!ageVerified) {
      this.router.navigate(['/age-verification']);
      return false;
    }

    return true;
  }
}
