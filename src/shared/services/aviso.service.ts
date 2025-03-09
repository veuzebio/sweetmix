import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvisoService {
  avisos$ = new Subject<string>();

  sucesso(texto: string) {
    this.avisos$.next(texto);
  }
}
