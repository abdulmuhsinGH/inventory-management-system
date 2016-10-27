import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import './rxjs-extensions';

import { AppModule } from './app/app.module';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
