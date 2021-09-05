import { OverlayContainer } from "@angular/cdk/overlay";
import { EventEmitter, Output } from "@angular/core";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  @Output() darkModeChange = new EventEmitter<boolean>();

  public get darkMode(): boolean {
    return this._darkMode;
  }
  public set darkMode(value: boolean) {
    this._darkMode = value;
    this.darkModeChange.emit(value);
    this.setScssVariables();
    if (value) {
      this.overlayContainer.getContainerElement().classList.add("dark-mode");
    } else {
      this.overlayContainer.getContainerElement().classList.remove("dark-mode");
    }
    this.localStorageService.set("darkMode", value);
  }
  private _darkMode = false;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly overlayContainer: OverlayContainer,
  ) {
    this.darkMode = (this.localStorageService.get("darkMode") as boolean) ?? false;
  }

  private setScssVariables(): void {
    document.documentElement.style.setProperty("--general-color", this.darkMode ? "white" : "black");
    document.documentElement.style.setProperty(
      "--general-color2",
      this.darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    );
  }
}
