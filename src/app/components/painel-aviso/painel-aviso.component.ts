import { AfterViewInit, Component, inject, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { SweetmixSnackbarComponent } from '@shared/components';
import { AvisoService } from '@shared/services';

@Component({
    selector: 'app-painel-aviso',
    templateUrl: 'painel-aviso.component.html',
    imports: [SweetmixSnackbarComponent]
})

export class PainelAvisoComponent implements AfterViewInit, OnDestroy {
    private avisoService = inject(AvisoService);
    private subs = new Subscription();

    aviso = '';
  
    ngAfterViewInit(): void {
      this.subs.add(
        this.avisoService.avisos$.subscribe(aviso => {
          this.aviso = aviso;
          timer(3000).subscribe(() => this.aviso = '');
        })
      );
    }
  
    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }
  }