import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'upload',
    loadComponent: () => import('./upload/upload.component').then((m) => m.UploadComponent),
  },
  {
    path: 'summary',
    loadComponent: () => import('./summary/summary.component').then((m) => m.SummaryComponent),
  },
  {
    path: 'overview',
    loadComponent: () => import('./overview/overview.component').then((m) => m.OverviewComponent),
  },
  {
    path: 'process',
    loadComponent: () => import('./process/process.component').then((m) => m.ProcessComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
