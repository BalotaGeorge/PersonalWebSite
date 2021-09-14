import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { ITodoModel } from "../../models/todo-model";

@Component({
  selector: "todo-list-page",
  templateUrl: "./todo-list-page.component.html",
  styleUrls: ["./todo-list-page.component.scss"],
})
export class TodoListPageComponent implements OnInit {
  public minCalendarDate: Date = new Date();
  public listOfTodos!: Array<ITodoModel>;

  public todo: ITodoModel = {} as ITodoModel;

  constructor(private readonly localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this.listOfTodos = (this.localStorageService.get("todos") as Array<ITodoModel>) ?? [];
  }

  public addTodo(): void {
    this.listOfTodos.push(this.todo);
    this.localStorageService.set("todos", this.listOfTodos);
    this.getTodos();
  }

  public removeTodo(todo: ITodoModel): void {
    this.listOfTodos.delete(todo);
    this.localStorageService.set("todos", this.listOfTodos);
    this.getTodos();
  }
}
