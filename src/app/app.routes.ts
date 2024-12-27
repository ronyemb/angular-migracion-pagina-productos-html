import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/portafolio/portafolio.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
  },
  {
    path: 'item/:id',
    loadComponent: () => import('./pages/item/item.component'),
  },
  {
    path: 'search/:termino',
    loadComponent: () => import('./pages/search/search.component'),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
