import {
  booleanAttribute,
  Component,
  computed,
  Input,
  input,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'sw-snackbar',
  template: `
    <div class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 flex items-center justify-between">
      <span>{{ message() }}</span>
    </div>
  `,
})
export class SweetmixSnackbarComponent {
    message = input.required<string>();
  }
