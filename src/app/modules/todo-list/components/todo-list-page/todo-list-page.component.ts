import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "src/app/core/services/local-storage.service";

@Component({
  selector: "todo-list-page",
  templateUrl: "./todo-list-page.component.html",
  styleUrls: ["./todo-list-page.component.scss"],
})
export class TodoListPageComponent implements OnInit {
  constructor(private readonly localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // this.localStorageService.
  }
}
