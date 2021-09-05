import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreeByThreeGeneratorPageComponent } from "./components/three-by-three-generator-page/three-by-three-generator-page.component";

const routes: Routes = [
  { path: "", component: ThreeByThreeGeneratorPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeByThreeGeneratorRoutingModule {}
