import { EventEmitter, Output } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { IImageModel } from "src/app/shared/models/image-model";
import { DialogService } from "src/app/core/services/dialog.service";
import { ImageProcessService } from "src/app/core/services/image-process.service";

@Component({
  selector: "three-by-three-generator-get-image-cell-dialog",
  templateUrl: "./get-image-cell-dialog.component.html",
  styleUrls: ["./get-image-cell-dialog.component.scss"],
})
export class GetImageCellDialogComponent {
  @Output() image = new EventEmitter<IImageModel>();

  public url?: string;
  public imageName?: string;
  public imageFile?: IImageModel;

  constructor(
    private readonly imageProcessService: ImageProcessService,
    private readonly dialogService: DialogService,
    private readonly matDialogRef: MatDialogRef<GetImageCellDialogComponent>,
  ) {}

  public getFileImage(image: IImageModel): void {
    this.imageFile = image;
    this.imageName = image.name;
    delete this.url;
  }

  public async getUrlImage(): Promise<void> {
    try {
      this.imageFile = await this.imageProcessService.urlToImage(this.url as string);
    } catch {
      this.dialogService.openErrorDialog("The url provided is invalid");
    }
  }

  public urlSet(): void {
    delete this.imageFile;
    delete this.imageName;
  }

  public async saveImage(): Promise<void> {
    if (!this.imageFile && this.url) {
      await this.getUrlImage();

      if (!this.imageFile) {
        return;
      }
    }

    this.image.emit(this.imageFile);
    this.matDialogRef.close();
  }
}
