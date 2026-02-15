import { Component } from '@angular/core';
import { ButtonComponent, StartpageComponent } from "@drv-ds/drv-design-system-ng";

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, StartpageComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
