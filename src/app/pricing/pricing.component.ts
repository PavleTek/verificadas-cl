import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PricingPlan } from '../types';
import { MainService } from '../main.service';
import { formatPrice } from '../helper-functions';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  economicPricingPlan: PricingPlan | any;
  regularPricingPlan: PricingPlan | any;
  premiumPricingPlan: PricingPlan | any;

  constructor(private mainService: MainService, private router: Router) {}

  goToAnounce(paymentTier: string) {
    this.router.navigate([`/anunciate/${paymentTier}`]);
  }

  formatPrice(price: number) {
    return formatPrice(price);
  }

  calculateFinalPrice(originalPrice: number, discountPercentage: number): number {
    if (discountPercentage < 0 || discountPercentage > 100) {
      return originalPrice;
    }
    let discountAmount = originalPrice * (discountPercentage / 100);
    let finalPrice = originalPrice - discountAmount;
    return finalPrice;
  }

  getFormatedDiscountedPrice(pricingPlan: PricingPlan) {
    const discountedPrice = this.calculateFinalPrice(pricingPlan.price, pricingPlan.discount);
    return formatPrice(discountedPrice);
  }

  async initiatePricings() {
    const response = await this.mainService.getAllPricingPlans();
    const pricingPlans = response.data;
    this.premiumPricingPlan = pricingPlans.find((pricingPlan: PricingPlan) => pricingPlan.name === 'Premium');
    this.regularPricingPlan = pricingPlans.find((pricingPlan: PricingPlan) => pricingPlan.name === 'Regular');
    this.economicPricingPlan = pricingPlans.find((pricingPlan: PricingPlan) => pricingPlan.name === 'Economica');
  }

  async ngOnInit() {
    await this.initiatePricings();
  }
}
