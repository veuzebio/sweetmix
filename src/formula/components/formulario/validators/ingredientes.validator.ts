import { AbstractControl, ValidationErrors, FormArray } from "@angular/forms";

export function ingredientesValidator(control: AbstractControl): ValidationErrors | null {
  const ingredientesArray = control as FormArray;

  if (ingredientesArray.length <= 0) {
    return { required: true };
  }


  if (!ingredientesArray.controls.some((item) => item.get('codigo')?.value?.trim() !== '')) {
    return { ingredienteInvalido: true };
  }

  return null;
}