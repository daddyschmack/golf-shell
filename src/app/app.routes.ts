import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthPage } from './auth-page/auth-page';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'play',
    loadComponent: () =>
      loadRemoteModule('mfe-scorecard', './Component')
        .then(m => m.App)
  },
  {
    path: 'profile',
    loadComponent: () =>
      loadRemoteModule('mfe-profile', './Component')
        .then(m => m.App)
  },
    {
    path: 'teams',
    loadComponent: () =>
      loadRemoteModule('mfe-teams', './TeamManager')
        .then(m => m.TeamManager)
  },
  {
    path:'auth',
  component: AuthPage,
  pathMatch: 'full'
  },
  {
    path:'**',
  redirectTo: '',
  pathMatch: 'full'
  }
];
