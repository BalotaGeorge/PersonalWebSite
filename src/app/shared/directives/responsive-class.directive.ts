import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Directive({
  selector: "[responsive-class]",
})
export class ResponsiveClassDirective implements OnInit, OnDestroy {
  @Input("responsive-class") classList = "";

  private windowResizeSubscription!: Subscription;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.windowResizeSubscription = fromEvent(window, "resize")
      .pipe(debounceTime(150))
      .subscribe((event: Event) => {
        this.setResponsiveClasses((event.target as Window).innerWidth);
      });
  }

  ngOnInit(): void {
    this.setResponsiveClasses(window.innerWidth);
  }

  private setResponsiveClasses(windowWidth: number): void {
    const classList: DOMTokenList = this.elementRef.nativeElement.classList;
    const classes: Array<string> = this.classList.split(" ").filter((classValue: string) => classValue);
    classes.forEach((classValue: string) => {
      const [className, size] = classValue.split(".");
      if (this.checkMediaSize(size, windowWidth)) {
        classList.add(className);
      } else {
        classList.remove(className);
      }
    });
  }

  private checkMediaSize(size: string, windowWidth: number): boolean {
    switch (size) {
      case "sm":
        return windowWidth < 576;

      case "md":
        return windowWidth < 768;

      case "lg":
        return windowWidth < 992;

      case "xl":
        return windowWidth < 1200;

      default:
        const sizeAsNumber = Number(size);
        return isNaN(sizeAsNumber) ? true : windowWidth < sizeAsNumber;
    }
  }

  ngOnDestroy(): void {
    this.windowResizeSubscription?.unsubscribe();
  }
}
