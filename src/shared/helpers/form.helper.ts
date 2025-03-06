import { FormGroup, FormArray } from '@angular/forms';

export function markAllAsTouched(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((controlName) => {
    const control = formGroup.get(controlName);

    if (control instanceof FormArray) {
        control.controls.forEach((item) => markAllAsTouched(item as FormGroup));
    } else if (control instanceof FormGroup) {
        markAllAsTouched(control);
    } else {
      control?.markAsTouched();
      control?.updateValueAndValidity();
    }
  });
}
