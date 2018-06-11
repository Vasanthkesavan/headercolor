import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {LicenseManager} from 'ag-grid-enterprise/main';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// tslint:disable-next-line:quotemark
LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_1_August_2018__MTUzMzA3ODAwMDAwMA==8c0b423295f5960e7d0f3cbb4292e068");


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
