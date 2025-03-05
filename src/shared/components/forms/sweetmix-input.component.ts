import { JsonPipe, NgClass } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, input, OnInit, viewChild } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgControlStatus, ValidationErrors, Validator } from '@angular/forms';

import { BaseControl } from './base-control.component';
import { SweetmixInputDirective, SweetmixLabelDirective } from '@shared/directives';

@Component({
  imports: [SweetmixInputDirective, SweetmixLabelDirective],
  selector: 'sw-input',
  template: `
    <div class="relative z-0 mb-6 pb-6 w-full group">
      <input
        #inputRef
        type="text"
        name="input"
        placeholder=" "
        swInput
        [hasError]="errors"
        [value]="value" 
        (input)="onInputChange($event)" 
      />
      <label
        for="input"
        swLabel
        [hasError]="errors"
      >
        {{ label() }}
      </label>

      @if (errors) {
        <span class="absolute top-11 left-0 text-xs text-red-500">
          {{ errorMessage() }}
        </span>
      }
    </div>
  `,
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
export class SweetmixInputComponent extends BaseControl implements OnInit {
  private controlContainer = inject(ControlContainer);
  private ngControl: NgControl | null = null;

  private inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  label = input.required<string>();
  name = input.required<string>();
  errorMessage = input<string>('Valor inválido.');

  errors: ValidationErrors | null = null;

  ngOnInit(): void {
    this.ngControl = this.controlContainer.control?.get(this.name()) as unknown as NgControl;

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;

      this.ngControl!.statusChanges!.subscribe(() => {
        this.errors = this.ngControl!.errors;   
      });
    }
  }

  focus(): void {
    this.inputRef()?.nativeElement.focus();    
  }
}


