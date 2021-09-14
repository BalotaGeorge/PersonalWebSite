import { ElementRef } from "@angular/core";
import { ResponsiveClassDirective } from "./responsive-class.directive";

describe("ResponsiveClassDirective", () => {
  it("should create an instance", () => {
    const directive = new ResponsiveClassDirective(new ElementRef<HTMLElement>(new HTMLElement()));
    expect(directive).toBeTruthy();
  });
});
