import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectsPageComponent } from "./components/projects-page/projects-page.component";

const routes: Routes = [
  {
    path: "3x3generator",
    loadChildren: () =>
      import("../modules/three-by-three-generator/three-by-three-generator.module").then(
        (m) => m.ThreeByThreeGeneratorModule,
      ),
  },
  {
    path: "todolist",
    loadChildren: () => import("../modules/todo-list/todo-list.module").then((m) => m.TodoListModule),
  },
  { path: "", component: ProjectsPageComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EntryPointRoutingModule {}
