import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { PainelAvisoComponent } from '../components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, PainelAvisoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
