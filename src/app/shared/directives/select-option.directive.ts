import { Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { DialogService } from "src/app/core/services/dialog.service";
import { SelectOptionDialogComponent } from "../components/select-option-dialog/select-option-dialog.component";
import { IOptionSelectModel } from "../models/option-select-model";

@Directive({
  selector: "[select-option]",
})
export class SelectOptionDirective<T extends IOptionSelectModel> {
  @Output() selectedChange = new EventEmitter<T>();

  @Input() selected!: T;
  @Input() selectTitle = "select";
  @Input("select-option") selectList!: Array<T>;

  constructor(public readonly elementRef: ElementRef<HTMLElement>, private readonly dialogService: DialogService) {
    elementRef.nativeElement.addEventListener("click", () => this.openSelectDialog());
  }

  public async openSelectDialog(): Promise<void> {
    const dialog = await this.dialogService.openDialog(SelectOptionDialogComponent, this.selectTitle, "small");
    const component = dialog.componentInstance.embeddedComponentInstance;
    component.selectList = this.selectList;
    component.selected = this.selected;
    component.selectedChange.subscribe((result: T) => {
      this.selectedChange.emit(result);
      dialog.close();
    });
  }
}
