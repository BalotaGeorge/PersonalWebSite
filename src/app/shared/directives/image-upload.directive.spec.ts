import { ElementRef } from "@angular/core";
import { ImageProcessService } from "src/app/core/services/image-process.service";
import { ImageUploadDirective } from "./image-upload.directive";

describe("ImageUploadDirective", () => {
  it("should create an instance", () => {
    const directive = new ImageUploadDirective(
      new ElementRef<HTMLElement>(new HTMLElement()),
      new ImageProcessService(),
    );
    expect(directive).toBeTruthy();
  });
});
