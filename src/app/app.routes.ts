import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { DashboardComponent } from './dashboard/dashboard.component';

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
  }
];
