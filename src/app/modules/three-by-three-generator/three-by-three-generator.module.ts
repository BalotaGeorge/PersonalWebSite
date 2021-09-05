import { NgModule } from "@angular/core";
import { ThreeByThreeGeneratorRoutingModule } from "./three-by-three-generator-routing.module";
import { ThreeByThreeGeneratorPageComponent } from "./components/three-by-three-generator-page/three-by-three-generator-page.component";
import { GetImageCellDialogComponent } from "./components/get-image-cell-dialog/get-image-cell-dialog.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ThreeByThreeGeneratorPageComponent, GetImageCellDialogComponent],
  imports: [SharedModule, ThreeByThreeGeneratorRoutingModule],
})
export class ThreeByThreeGeneratorModule {}
