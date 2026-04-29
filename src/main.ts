import { initFederation } from '@angular-architects/native-federation';
import { environment } from './environments/environment';

initFederation(environment.remoteManifest as any)
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
