import { Component, Input, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "shared-error-dialog-layout",
  templateUrl: "./error-dialog-layout.component.html",
  styleUrls: ["./error-dialog-layout.component.scss"],
})
export class ErrorDialogLayoutComponent implements OnDestroy {
  @Input() message!: string;

  private timeout!: NodeJS.Timeout;

  constructor(private readonly matDialogRef: MatDialogRef<ErrorDialogLayoutComponent>) {
    this.timeout = setTimeout(() => this.matDialogRef.close(), 4000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
