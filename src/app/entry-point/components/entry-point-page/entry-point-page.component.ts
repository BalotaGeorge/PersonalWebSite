import { Component } from "@angular/core";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./entry-point-page.component.html",
  styleUrls: ["./entry-point-page.component.scss"],
})
export class EntryPointPageComponent {
  constructor(public readonly themeService: ThemeService) {}
}
