import {Component, inject, OnInit, signal} from '@angular/core';
import { TodosService } from '../services/todos-service';
import { Todo } from '../model/todo';
import {catchError} from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit{
    todoService = inject(TodosService);
    todoList = signal<Array<Todo>>([]);

    ngOnInit() {
      this.todoService.getTodosFromApi().pipe(catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((todos) => {
        this.todoList.set(todos);
      })
    }
}
