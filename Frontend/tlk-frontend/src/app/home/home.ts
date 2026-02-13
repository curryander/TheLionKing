import {Component, signal} from '@angular/core';
import {Greeter} from '../components/greeter/greeter';
import {Counter} from '../components/counter/counter';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Greeter, Counter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    homeMessageOut = signal("Hello World from the Home Component");

    keyUpHandler(event: KeyboardEvent) {
      console.log(`${event.key} was pressed`);
  }
}
