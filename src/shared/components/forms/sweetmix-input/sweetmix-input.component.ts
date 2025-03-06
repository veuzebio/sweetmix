import { Component, ElementRef, forwardRef, inject, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';

import { SweetmixInputDirective, SweetmixLabelDirective } from '@shared/directives';
import { BaseControl } from '../base-control.component';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  imports: [SweetmixInputDirective, SweetmixLabelDirective],
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
  private controlContainer = inject(ControlContainer);
  private inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');
  private subs = new Subscription();

  label = input.required<string>();
  name = input.required<string>();
  errorMessage = input<string>('Valor inválido.');
  
 
  get hasError(): boolean | null {     
    return this.errors && (this.touched || this.dirty);
  }

  ngOnInit(): void {
    this.ngControl = this.controlContainer.control?.get(this.name()) as unknown as NgControl;

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


