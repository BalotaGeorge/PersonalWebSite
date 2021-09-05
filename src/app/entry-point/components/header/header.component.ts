import { Component } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "entry-point-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(public readonly themeService: ThemeService) {}

  toggleDarkTheme(event: MatSlideToggleChange): void {
    this.themeService.darkMode = event.checked;
  }
}
