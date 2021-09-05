import { EventEmitter, Input } from "@angular/core";
import { Output } from "@angular/core";
import { Directive, ElementRef, OnInit } from "@angular/core";
import { IImageModel } from "src/app/shared/models/image-model";
import { ImageProcessService } from "src/app/core/services/image-process.service";
import { FileUploadDirective } from "./file-upload.directive";

@Directive({
  selector: "[image-upload]",
})
export class ImageUploadDirective extends FileUploadDirective implements OnInit {
  @Output() images = new EventEmitter<Array<IImageModel>>();

  @Input() extensions: Array<string> = ["*"];

  constructor(public readonly elementRef: ElementRef, private readonly imageProcessService: ImageProcessService) {
    super(elementRef);
  }

  ngOnInit(): void {
    this.accept = this.extensions.reduce((output: string, current: string, index: number) => {
      if (index < this.extensions.length - 1) {
        return `${output}image/${current}, `;
      } else {
        return `${output}image/${current}`;
      }
    }, "");

    this.files.subscribe(async (result: Array<File>) => {
      const images: Array<IImageModel> = [];

      for (const file of result) {
        images.push(await this.imageProcessService.fileToImage(file));
      }

      this.images.emit(images);
    });
  }
}
