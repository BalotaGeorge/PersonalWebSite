import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./modules/material/material.module";
import { FileUploadDirective } from "./directives/file-upload.directive";
import { ImageUploadDirective } from "./directives/image-upload.directive";
import { FormsModule } from "@angular/forms";
import { DialogLayoutComponent } from "./components/dialog-layout/dialog-layout.component";
import { ErrorDialogLayoutComponent } from "./components/error-dialog-layout/error-dialog-layout.component";
import { DividerComponent } from "./components/divider/divider.component";
import { SelectOptionDirective } from "./directives/select-option.directive";
import { SelectOptionDialogComponent } from "./components/select-option-dialog/select-option-dialog.component";
import { ResponsiveClassDirective } from "./directives/responsive-class.directive";

@NgModule({
  declarations: [
    FileUploadDirective,
    ImageUploadDirective,
    DialogLayoutComponent,
    ErrorDialogLayoutComponent,
    DividerComponent,
    SelectOptionDirective,
    SelectOptionDialogComponent,
    ResponsiveClassDirective,
  ],
  imports: [MaterialModule, CommonModule, FormsModule],
  exports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    FileUploadDirective,
    ImageUploadDirective,
    DialogLayoutComponent,
    ErrorDialogLayoutComponent,
    DividerComponent,
    SelectOptionDirective,
    ResponsiveClassDirective,
  ],
})
export class SharedModule {}
