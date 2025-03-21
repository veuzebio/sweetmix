import { booleanAttribute, Component, ElementRef, forwardRef, inject, input, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { SweetmixInputDirective, SweetmixLabelDirective } from '@shared/directives';
import { Subscription } from 'rxjs';
import { BaseControl } from '../base-control.component';
import { NgClass } from '@angular/common';

@Component({
  imports: [
    NgClass,
    SweetmixInputDirective, 
    SweetmixLabelDirective,
  ],
  selector: 'sw-input',
  templateUrl: 'sweetmix-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SweetmixInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SweetmixInputComponent),
      multi: true,
    }

  ],
})
export class SweetmixInputComponent extends BaseControl implements OnInit, OnDestroy {
  private controlContainer = inject(ControlContainer, { optional: true });
  private inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');
  private subs = new Subscription();

  label = input.required<string>();
  formControlName = input<string>('');
  errorMessage = input<string>('Valor inválido.');
  usarDica = input<boolean>(false);
  mostrarDica = signal<boolean>(false);

  get hasError(): boolean | null {     
    return this.errors && (this.touched || this.dirty);
  }

  ngOnInit(): void {
    if (!this.formControlName().length) return;
    if (!this.controlContainer) return;

    this.ngControl = this.controlContainer?.control?.get(this.formControlName()) as unknown as NgControl;

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      
      this.subs.add(this.handleStatusChanges().subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  focus(): void {
    this.inputRef()?.nativeElement.focus();    
  }
}


