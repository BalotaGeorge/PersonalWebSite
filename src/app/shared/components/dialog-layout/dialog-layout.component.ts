import { ComponentFactory, ComponentRef, EventEmitter, Inject, Input, OnInit } from "@angular/core";
import { Output } from "@angular/core";
import { AfterViewInit, ComponentFactoryResolver } from "@angular/core";
import { Component, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { GetImageCellDialogComponent } from "src/app/modules/three-by-three-generator/components/get-image-cell-dialog/get-image-cell-dialog.component";

@Component({
  selector: "shared-dialog-layout",
  templateUrl: "./dialog-layout.component.html",
  styleUrls: ["./dialog-layout.component.scss"],
})
export class DialogLayoutComponent<T> implements AfterViewInit {
  @ViewChild("componentContainer", { read: ViewContainerRef }) private componentContainer!: ViewContainerRef;

  @Output() embeddedComponentInstanceEmitter = new EventEmitter<void>();

  public embeddedComponentInstance!: T;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; component: Type<T> },
    private readonly componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngAfterViewInit(): void {
    const componentFactory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(
      this.data.component,
    );

    const componentRef: ComponentRef<T> = this.componentContainer.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();

    this.embeddedComponentInstance = componentRef.instance;
    this.embeddedComponentInstanceEmitter.emit();
  }
}
