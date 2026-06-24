import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from './components/menucomponent/menucomponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menucomponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
