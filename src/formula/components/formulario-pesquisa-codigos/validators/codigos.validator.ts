import { AbstractControl, ValidationErrors, FormArray } from "@angular/forms";

export function codigosValidator(control: AbstractControl): ValidationErrors | null {
  const codigosArray = control as FormArray;

  if (codigosArray.length <= 0) {
    return { required: true };
  }

  if (codigosArray.controls.filter((item) => item.value?.trim() !== '').length < 2) {
    return { quantidadeMinima: true };
  }

  return null;
}