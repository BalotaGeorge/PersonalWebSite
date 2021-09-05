import { NgModule } from "@angular/core";
import { EntryPointRoutingModule } from "./entry-point-routing.module";
import { EntryPointPageComponent } from "./components/entry-point-page/entry-point-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProjectsPageComponent } from "./components/projects-page/projects-page.component";
import "../core/services/prototype-extensions";
import { MatNativeDateModule } from "@angular/material/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [EntryPointPageComponent, HeaderComponent, FooterComponent, ProjectsPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CoreModule,
    SharedModule,
    EntryPointRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [],
  bootstrap: [EntryPointPageComponent],
})
export class EntryPointModule {}
