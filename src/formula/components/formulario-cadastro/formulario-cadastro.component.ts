import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { SweetmixInputComponent } from '@shared/components';
import { AutoFocusDirective, SweetmixButtonDirective } from '@shared/directives';
import * as helper from '@shared/helpers';
import { Formula } from '@shared/models';

function ingredientesValidator(control: AbstractControl): ValidationErrors | null {
  const ingredientesArray = control as FormArray;

  if (ingredientesArray.length <= 0) {
    return { required: true };
  }


  if (!ingredientesArray.controls.some((item) => item.get('codigo')?.value?.trim() !== '')) {
    return { ingredienteInvalido: true };
  }

  return null;
}

@Component({
  selector: 'for-formulario-cadastro',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SweetmixInputComponent,
    SweetmixButtonDirective,
    AutoFocusDirective
  ],
  templateUrl: 'formulario-cadastro.component.html',
  styleUrl: 'formulario-cadastro.component.css',
})
export class FormularioCadastroComponent {
  private fb = inject(FormBuilder);

  formulaCadastrada = output<Formula>();

  form = this.fb.group({
    codigo: ['', Validators.required],
    nome: [''],
    ingredientes: this.fb.array([], ingredientesValidator),
  });

  get ingredientes() {
    return this.form.get('ingredientes') as FormArray;
  }

  criarElemento(): FormGroup {
    return this.fb.group({
      codigo: ['', Validators.required],
      nome: [''],
    });
  }

  adicionarIngrediente(): void {
    this.ingredientes.push(this.criarElemento());
  }

  removerIngrediente(indice: number): void {
    if (this.ingredientes.controls.length === 1) return;

    this.ingredientes.removeAt(indice);
  }

  limpar(): void {
    if (confirm('Deseja realmente limpar o formulário?')) {
      this.reiniciarFormulario();
    }
  }

  cadastrar(): void {
    this.validarIngredientes();

    if (this.form.invalid) {      
      helper.markAllAsTouched(this.form);
      return;
    }

    const formula = {
      codigo: this.form.value.codigo!,
      nome: this.form.value.nome || null,
      ingredientes: this.form.value.ingredientes!,
    };

    this.formulaCadastrada.emit(formula as Formula);
    this.reiniciarFormulario();
  }

  private validarIngredientes(): void {
    if (Object.keys(this.ingredientes.errors ?? {}).length > 0) {
      alert('Por favor, preencha o código de um ingrediente.');
      return;
    }

    this.removerIngredientesSemCodigo();
  }

  private removerIngredientesSemCodigo(): void {
    for (let i = this.ingredientes.length - 1; i >= 0; i--) {
      const codigo = this.ingredientes.at(i).get('codigo')?.value;

      if (!codigo) {
        this.ingredientes.removeAt(i);
      }
    }
  }

  private reiniciarFormulario(): void {
    this.form.reset();
    this.ingredientes.clear();
  }
}
