import { Component } from "@angular/core";
import { IProjectModel } from "../../models/project-model";

@Component({
  selector: "entry-point-projects-page",
  templateUrl: "./projects-page.component.html",
  styleUrls: ["./projects-page.component.scss"],
})
export class ProjectsPageComponent {
  public projects: Array<IProjectModel> = [
    {
      name: "todo list",
      path: "todolist",
    },
    {
      name: "3x3 generator",
      path: "3x3generator",
    },
  ];
}
