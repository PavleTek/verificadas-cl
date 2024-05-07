import { Routes } from '@angular/router';
import { MainUserViewComponent } from './main-user-view/main-user-view.component';
import { BlogComponent } from './blog/blog.component';
import { AnounceComponent } from './anounce/anounce.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { GirlPageComponent } from './girl-page/girl-page.component';
import { BlogOneComponent } from './blog-one/blog-one.component';
import { BlogSecondComponent } from './blog-second/blog-second.component';
import { BlogThirdComponent } from './blog-third/blog-third.component';
import { EntryComponent } from './entry/entry.component';
import { AgeGuardService } from './age-guard.service';

export const routes: Routes = [
  {
    path: 'age-verification',
    component: EntryComponent,
  },
  {
    path: 'escorts/:cityName',
    component: MainUserViewComponent,
  },
  {
    path: 'escorts',
    component: MainUserViewComponent,
    canActivate: [AgeGuardService],
  },
  {
    path: 'escort-verificada/:id',
    component: GirlPageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'prices',
    component: PricingComponent,
  },
  {
    path: 'anunciate',
    component: AnounceComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'primer-encuentro-con-una-escort-de-lujo',
    component: BlogOneComponent,
  },
  {
    path: 'escorts-en-santiago-oriente',
    component: BlogSecondComponent,
  },
  {
    path: 'seguridad-y-verificadas-santiago',
    component: BlogThirdComponent,
  },
  {
    path: 'anunciate/:paymentTier',
    component: AnounceComponent,
  },
  { path: '**', redirectTo: '/escorts' },
];
