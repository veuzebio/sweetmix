import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PainelAvisoComponent } from '../components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PainelAvisoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
