import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { SweetmixInputComponent } from '@shared/components';
import { SweetmixButtonDirective } from '@shared/directives';
import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';
import * as helper from '@shared/helpers';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SweetmixInputComponent,
    SweetmixButtonDirective,
  ],
  templateUrl: 'cadastro-formula.component.html',
  styleUrl: 'cadastro-formula.component.css',
})
export class CadastroFormulaComponent {
  private formulaService = inject(FormulaService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    codigo: [null, Validators.required],
    nome: [null],
    ingredientes: this.fb.array([this.criarElemento()]),
  });

  get ingredientes() {
    return this.form.get('ingredientes') as FormArray;
  }

  criarElemento(): FormGroup {
    return this.fb.group({
      ingredienteCodigo: [null, Validators.required],
      ingredienteNome: [null],
    });
  }

  adicionarIngrediente(): void {
    this.ingredientes.push(this.criarElemento());
  }

  limpar(): void {
    this.form.reset();
  }

  cadastrar(): void {
    if (this.form.invalid) {
      helper.markAllAsTouched(this.form);
      return;
    }

    const formula: Formula = {
      codigo: this.form.value.codigo!,
      nome: this.form.value.nome || null,
      ingredientes: this.form.value.ingredientes!,
    };

    // this.formulaService
    //   .cadastrarNovaFormula(this.form.value as Formula)
    //   .subscribe({
    //     next: (valor) => console.log('Formula cadastrada com sucesso', valor),
    //     error: (erro) => console.error('Erro ao cadastrar formula', erro),
    //   });
  }

}
