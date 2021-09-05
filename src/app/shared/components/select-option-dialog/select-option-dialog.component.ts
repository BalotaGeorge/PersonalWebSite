import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IOptionSelectModel } from "../../models/option-select-model";

@Component({
  selector: "shared-select-option-dialog",
  templateUrl: "./select-option-dialog.component.html",
  styleUrls: ["./select-option-dialog.component.scss"],
})
export class SelectOptionDialogComponent<T extends IOptionSelectModel> {
  @Output() selectedChange = new EventEmitter<T>();

  @Input() selected!: T;
  @Input() selectList!: Array<T>;
}
