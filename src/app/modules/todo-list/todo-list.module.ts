import { NgModule } from "@angular/core";
import { TodoListPageComponent } from "./components/todo-list-page/todo-list-page.component";
import { SharedModule } from "src/app/shared/shared.module";
import { TodoListRoutingModule } from "./todo-list-routing.module";

@NgModule({
  declarations: [TodoListPageComponent],
  imports: [SharedModule, TodoListRoutingModule],
})
export class TodoListModule {}
