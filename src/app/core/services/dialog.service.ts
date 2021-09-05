import { Injectable, Type } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogLayoutComponent } from "src/app/shared/components/dialog-layout/dialog-layout.component";
import { ErrorDialogLayoutComponent } from "src/app/shared/components/error-dialog-layout/error-dialog-layout.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private readonly matDialog: MatDialog) {}

  public async openDialog<T>(
    component: Type<T>,
    title = "dialog",
    size: "flexible" | "small" | "medium" | "large" = "flexible",
    panelClass: string | null = null,
  ): Promise<MatDialogRef<DialogLayoutComponent<T>>> {
    return new Promise((res) => {
      const dialogRef: MatDialogRef<DialogLayoutComponent<T>> = this.matDialog.open(DialogLayoutComponent, {
        ...(size === "small" && { width: "500px" }),
        ...(size === "medium" && { width: "850px" }),
        ...(size === "large" && { width: "1200px" }),
        ...(size === "flexible" && { minWidth: "600px" }),
        maxWidth: "100vw",
        panelClass: panelClass ? ["custom-dialog", panelClass] : "custom-dialog",
        autoFocus: true,
        restoreFocus: true,
        closeOnNavigation: true,
        data: { title, component },
      } as MatDialogConfig) as MatDialogRef<DialogLayoutComponent<T>>;

      dialogRef.componentInstance.embeddedComponentInstanceEmitter.subscribe(() => {
        res(dialogRef);
      });
    });
  }

  public async openErrorDialog(message: string): Promise<void> {
    const dialogRef = await this.openDialog(ErrorDialogLayoutComponent, "error", "small", "error-dialog");
    dialogRef.componentInstance.embeddedComponentInstance.message = message;
  }
}
