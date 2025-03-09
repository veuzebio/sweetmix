import {
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'sw-snackbar',
  template: `
    <div class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-4 py-2 rounded shadow-lg flex items-center justify-between text-xl">
      <span>{{ message() }}</span>
    </div>
  `,
})
export class SweetmixSnackbarComponent {
  message = input.required<string>();
}
