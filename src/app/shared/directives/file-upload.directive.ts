import { EventEmitter, OnDestroy, Output } from "@angular/core";
import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[file-upload]",
})
export class FileUploadDirective implements OnDestroy {
  @Output() files = new EventEmitter<Array<File>>();
  @Input() accept = "*";
  @Input() multiple: string | null = null;

  constructor(public readonly elementRef: ElementRef<HTMLElement>) {
    elementRef.nativeElement.style.cursor = "pointer";
    elementRef.nativeElement.addEventListener("click", () => this.openFileSelect());
  }

  openFileSelect(): void {
    const input: HTMLInputElement = document.createElement("input");
    input.type = "file";
    input.accept = this.accept;
    input.multiple = this.multiple !== null;
    input.click();

    input.addEventListener("change", () => {
      const files: FileList = input.files as FileList;
      input.removeAllListeners;
      input.remove();

      const result: Array<File> = [];
      for (let index = 0; index < files.length; index++) {
        result.push(files.item(index) as File);
      }

      this.files.emit(result);
    });
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeAllListeners;
  }
}
