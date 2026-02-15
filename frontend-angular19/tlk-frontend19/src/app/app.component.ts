import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent, HeaderComponent, RootComponent} from '@drv-ds/drv-design-system-ng';
import { HomeComponent } from "./home/home.component";
import { UploadComponent } from "./upload/upload.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RootComponent, HomeComponent, UploadComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tlk-frontend19';
}
