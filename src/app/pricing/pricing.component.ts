import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PricingPlan } from '../types';
import { MainService } from '../main.service';
import { formatPrice } from '../helper-functions';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  economicPricingPlan: PricingPlan | any;
  regularPricingPlan: PricingPlan | any;
  premiumPricingPlan: PricingPlan | any;

  constructor(private mainService: MainService, private router: Router, private titleService: Title, private metaService: Meta) {}

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
    this.titleService.setTitle('Precios Verificadas');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Descubre nuestros planes de precios competitivos para la publicación de anuncios de escorts en nuestro sitio. Calidad y visibilidad garantizadas para tu perfil.',
    });
    await this.initiatePricings();
  }
}
