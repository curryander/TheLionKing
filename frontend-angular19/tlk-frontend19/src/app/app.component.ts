import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootComponent} from '@drv-ds/drv-design-system-ng';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RootComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tlk-frontend19';
}
