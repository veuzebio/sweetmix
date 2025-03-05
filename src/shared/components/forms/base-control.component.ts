import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';

export abstract class BaseControl implements ControlValueAccessor, Validator {
  value: any;
  touched = false;

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
}
