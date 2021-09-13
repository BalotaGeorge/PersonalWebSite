/* eslint-disable no-console */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { EntryPointModule } from "./app/entry-point/entry-point.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(EntryPointModule)
  .catch((err) => console.error(err));
