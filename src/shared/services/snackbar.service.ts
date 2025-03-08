import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SnackbarService {
    document = inject(DOCUMENT);

    show(message: string) {
        const snackbar = this.document.createElement('sweetmix-snackbar');

        this.document.appendChild(snackbar).setAttribute('message', message);
        setTimeout(() => {
            snackbar.remove();
        }, 3000);
    }
}