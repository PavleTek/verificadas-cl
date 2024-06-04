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
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

export const routes: Routes = [
  {
    path: 'escorts/:cityName',
    component: MainUserViewComponent,
  },
  {
    path: 'escorts',
    component: MainUserViewComponent,
  },
  {
    path: 'escorts/',
    redirectTo: 'escorts',
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
    path: 'about/',
    redirectTo: 'about',
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'contact/',
    redirectTo: 'contact',
  },
  {
    path: 'prices',
    component: PricingComponent,
  },
  {
    path: 'prices/',
    redirectTo: 'prices',
  },
  {
    path: 'anunciate',
    component: AnounceComponent,
  },
  {
    path: 'anunciate/',
    redirectTo: 'anunciate',
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    component: BlogViewComponent,
  },
  {
    path: 'primer-encuentro-con-una-escort-de-lujo',
    component: BlogOneComponent,
  },
  {
    path: 'primer-encuentro-con-una-escort-de-lujo/',
    redirectTo: 'primer-encuentro-con-una-escort-de-lujo',
  },
  {
    path: 'escorts-en-santiago-oriente',
    component: BlogSecondComponent,
  },
  {
    path: 'escorts-en-santiago-oriente/',
    redirectTo: 'escorts-en-santiago-oriente',
  },
  {
    path: 'seguridad-y-verificadas-santiago',
    component: BlogThirdComponent,
  },
  {
    path: 'seguridad-y-verificadas-santiago/',
    redirectTo: 'seguridad-y-verificadas-santiago',
  },
  {
    path: 'anunciate/:paymentTier',
    component: AnounceComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: 'notFound/',
    redirectTo: 'notFound',
  },
  {
    path: '',
    component: EntryComponent,
  },
  { path: '**', redirectTo: '/escorts' },
];
