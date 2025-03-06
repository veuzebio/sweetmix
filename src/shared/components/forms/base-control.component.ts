import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { distinctUntilChanged, EMPTY, Observable, startWith, tap } from 'rxjs';

export abstract class BaseControl implements ControlValueAccessor, Validator {
  value: any;
  errors: ValidationErrors | null = null;
  touched: boolean | null = null;
  dirty: boolean | null = null;
  ngControl: NgControl | null = null;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  onValidatorChange: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  handleStatusChanges(): Observable<void> {
    if (!this.ngControl) {
      return EMPTY;
    }

    this.errors = this.ngControl!.errors; 
    
    return this.ngControl!.statusChanges!.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.errors = this.ngControl!.errors;
        this.touched = this.ngControl!.touched;
        this.dirty = this.ngControl!.dirty;
      })
    );
  }
}
