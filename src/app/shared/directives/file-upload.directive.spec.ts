import { ElementRef } from "@angular/core";
import { FileUploadDirective } from "./file-upload.directive";

describe("FileUploadDirective", () => {
  it("should create an instance", () => {
    const directive = new FileUploadDirective(new ElementRef<HTMLElement>(new HTMLElement()));
    expect(directive).toBeTruthy();
  });
});
