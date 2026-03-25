import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'play',
    // Assumes mfe-scorecard exposes a component from './Component'
    loadComponent: () => import('mfe-scorecard/Component').then((m) => m.App),
  },
  {
    path: 'teams',
    // Assumes mfe-teamManager exposes a component from './Component'
    loadComponent: () => import('mfe-teamManager/Component').then((m) => m.App),
  },
  {
    path: 'leaderboard',
    // Assumes mfe-scoreboard exposes a component from './Component'
    loadComponent: () => import('mfe-scoreboard/Component').then((m) => m.App),
  },
];
