import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SweetmixInputComponent } from '@shared/components';
import {
  SweetmixButtonDirective,
} from '@shared/directives';
import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';

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
export class CadastroFormulaComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    codigo: ['', Validators.required],
    nome: [''],
    ingredientes: this.fb.array([this.criarElemento()]),
  });

  
  get ingredientes() {
    return this.form.get('ingredientes') as FormArray;
  }

  get codigoInvalido(): boolean {
    const codigo = this.form.get('codigo') as FormControl;
    return codigo.invalid && (codigo.dirty || codigo.touched);
  }

  get ingredientesInvalidos(): boolean {
    return this.ingredientes.invalid && (this.ingredientes.dirty || this.ingredientes.touched);
  }

  ingredienteEspecificoInvalido(index: number) {
    const ingrediente = this.ingredientes.at(index) as FormGroup;
    return ingrediente.invalid && (ingrediente.dirty || ingrediente.touched);
  }

  ngOnInit(): void {}

  criarElemento(): FormGroup {
    return this.fb.group({
      codigo: ['', Validators.required],
      nome: [''],
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
      alert('Formula inválida');
      return;
    }

    const formula: Formula = {
      codigo: this.form.value.codigo!,
      nome: this.form.value.nome || null,
      ingredientes: this.form.value.ingredientes!,
    };

    this.formulaService
      .cadastrarNovaFormula(this.form.value as Formula)
      .subscribe({
        next: (valor) => console.log('Formula cadastrada com sucesso', valor),
        error: (erro) => console.error('Erro ao cadastrar formula', erro),
      });
  }
}
