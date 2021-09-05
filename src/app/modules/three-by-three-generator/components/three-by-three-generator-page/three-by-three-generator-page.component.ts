import { Component, OnInit } from "@angular/core";
import { IImageModel } from "src/app/shared/models/image-model";
import { DialogService } from "src/app/core/services/dialog.service";
import { ImageProcessService } from "src/app/core/services/image-process.service";
import { GetImageCellDialogComponent } from "../get-image-cell-dialog/get-image-cell-dialog.component";

@Component({
  selector: "three-by-three-generator-page",
  templateUrl: "./three-by-three-generator-page.component.html",
  styleUrls: ["./three-by-three-generator-page.component.scss"],
})
export class ThreeByThreeGeneratorPageComponent implements OnInit {
  public grid: Array<IImageModel> = [];
  public gridFilled = false;
  public gridSize!: number;
  public gridSizes = [2, 3, 4, 5];
  public exportSizes = [600, 900, 1200, 1500];

  constructor(
    private readonly dialogService: DialogService,
    private readonly imageProcessService: ImageProcessService,
  ) {}

  ngOnInit(): void {
    this.gridSizes = this.gridSizes.setToString((gridSize: number) => `${gridSize}x${gridSize}`);
    this.exportSizes = this.exportSizes.setToString((exportSize: number) => `${exportSize}px`);
    this.gridSize = this.gridSizes[1];
    this.setGridSize(this.gridSize);
  }

  public setGridSize(size: number): void {
    this.grid = new Array(size * size);
    this.gridFilled = false;
  }

  public async setCellImage(index: number): Promise<void> {
    const dialog = await this.dialogService.openDialog(GetImageCellDialogComponent, "select image");

    dialog.componentInstance.embeddedComponentInstance.image.subscribe((result: IImageModel) => {
      this.grid[index] = result;

      this.checkGridFilled();
    });
  }

  private checkGridFilled(): void {
    const imagesCount: number = this.grid.reduce((total: number) => ++total, 0);
    this.gridFilled = imagesCount === this.gridSize ** 2;
  }

  public async exportGrid(exportSize: number): Promise<void> {
    const imagesPromise: Array<Promise<HTMLImageElement>> = [];

    for (const cellImage of this.grid) {
      const imagePromise: Promise<HTMLImageElement> = new Promise((res) => {
        const image = new Image();
        image.src = cellImage.base64;

        image.onload = () => {
          res(image);
        };
      });

      imagesPromise.push(imagePromise);
    }

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = exportSize + 1;
    canvas.height = exportSize + 1;

    const images: Array<HTMLImageElement> = await Promise.all(imagesPromise);

    const cellSize = exportSize / this.gridSize;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < images.length; i++) {
      this.imageProcessService.drawImageCover(
        ctx,
        images[i],
        (i % this.gridSize) * cellSize + 1,
        parseInt((i / this.gridSize).toString()) * cellSize + 1,
        cellSize - 1,
        cellSize - 1,
      );
    }

    const gridImageSrc: string = canvas.toDataURL("image/png");
    canvas.remove();

    const downloader = document.createElement("a");
    downloader.href = gridImageSrc;
    downloader.download = `${this.gridSize}.png`;
    downloader.click();
    downloader.remove();
  }
}
