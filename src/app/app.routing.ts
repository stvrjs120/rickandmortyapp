import { Routes } from '@angular/router';
import { Error404Component } from './shared';

export const routes: Routes = [
  { path: '', redirectTo: 'episodes', pathMatch: 'full' },
  {
    path: 'episodes',
    loadChildren: () => import('./modules').then((m) => m.EpisodesModule),
  },
  { path: '**', component: Error404Component },
];
