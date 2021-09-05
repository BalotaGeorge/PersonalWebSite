import { Injectable } from "@angular/core";
import { IImageModel } from "../../shared/models/image-model";

@Injectable({
  providedIn: "root",
})
export class ImageProcessService {
  public setImageDimensions(image: IImageModel): Promise<void> {
    return new Promise((res, rej) => {
      const imageElement = new Image();
      imageElement.src = image.base64;

      imageElement.onload = () => {
        image.width = imageElement.width;
        image.height = imageElement.height;
        res();
      };

      imageElement.onerror = (error) => rej(error);
    });
  }

  public fileToImage(file: File): Promise<IImageModel> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const image: IImageModel = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result,
        } as IImageModel;

        await this.setImageDimensions(image);

        res(image);
      };

      reader.onerror = (error) => rej(error);
    });
  }

  public urlToImage(url: string): Promise<IImageModel> {
    return new Promise((res, rej) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = url;

      image.onload = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);

        const base64 = canvas.toDataURL("image/png");

        const result = {
          name: url.match(/[\w-]+\.(jpg|png|jpeg|tif|tiff|gif|bmp)/)?.[0] ?? "image.png",
          type: "image/png",
          size: atob(base64.substr(22)).length,
          base64: base64,
          width: image.width,
          height: image.height,
        } as IImageModel;

        canvas.remove();
        res(result);
      };

      image.onerror = (error) => rej(error);
    });
  }

  public resizeImage(imageModel: IImageModel, width: number, height: number): Promise<IImageModel> {
    return new Promise((res, rej) => {
      const image = new Image();
      image.src = imageModel.base64;

      image.onload = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);

        const newBase64 = canvas.toDataURL("image/png");

        const result = {
          name: imageModel.name,
          type: "image/png",
          size: atob(newBase64.substr(22)).length,
          base64: newBase64,
          width: width,
          height: height,
        } as IImageModel;

        canvas.remove();
        res(result);
      };

      image.onerror = (error) => rej(error);
    });
  }

  public drawImageCover(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
  ): void {
    const imageWidth: number = image.width;
    const imageHeight: number = image.height;
    const gradient: number = Math.min(w / imageWidth, h / imageHeight);

    let newImageWidth: number = imageWidth * gradient;
    let newImageHeight: number = imageHeight * gradient;
    let cx: number;
    let cy: number;
    let cw: number;
    let ch: number;
    let ar = 1;

    if (newImageWidth < w) ar = w / newImageWidth;
    if (Math.abs(ar - 1) < 1e-14 && newImageHeight < h) ar = h / newImageHeight;
    newImageWidth *= ar;
    newImageHeight *= ar;

    cw = imageWidth / (newImageWidth / w);
    ch = imageHeight / (newImageHeight / h);

    cx = (imageWidth - cw) * 0.5;
    cy = (imageHeight - ch) * 0.5;

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > imageWidth) cw = imageWidth;
    if (ch > imageHeight) ch = imageHeight;

    ctx.drawImage(image, cx, cy, cw, ch, x, y, w, h);
  }
}
