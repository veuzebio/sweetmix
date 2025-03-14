import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, output, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { v4 as uuid } from 'uuid'

import { SweetmixInputComponent } from '@shared/components';
import { AutoFocusDirective, SweetmixButtonDirective } from '@shared/directives';
import * as helper from '@shared/helpers';
import { Formula, Ingrediente } from '@shared/models';

import { FormulaSalva, TipoFormulario } from '../../models';
import { ingredientesValidator } from './validators';

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
  private formulaEdicao: Formula | null = null;
  
  @Input()
  public get formula(): Formula | null {
    return this.formulaEdicao;
  }
  public set formula(valor: Formula | null) {
    this.formulaEdicao = valor;

    if (this.formulaEdicao) {
      this.iniciarEdicao(this.formulaEdicao);
    }
  }

  tipo = signal<TipoFormulario>('cadastro');
  editando = computed(() => this.tipo() === 'edicao');

  salvarAcionado = output<FormulaSalva>();
  voltarAcionado = output<void>();

  form = this.fb.group({
    id: [uuid()],
    codigo: ['', Validators.required],
    nome: [''],
    ingredientes: this.fb.array([], ingredientesValidator),
  });

  get codigo() {
    return this.form.get('codigo') as FormControl;
  }

  get ingredientes() {
    return this.form.get('ingredientes') as FormArray;
  }

  criarElemento(codigo: string = '', nome: string = ''): FormGroup {
    return this.fb.group({
      codigo: [codigo, Validators.required],
      nome: [nome],
    });
  }

  adicionarIngrediente(codigo: string = '', nome: string = ''): void {
    this.ingredientes.push(this.criarElemento(codigo, nome));
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

  voltar(): void {
    this.voltarAcionado.emit();
  }

  cadastrar(): void {
    this.validarIngredientes();

    if (this.form.invalid) {      
      helper.markAllAsTouched(this.form);
      return;
    }

    const valoresFormulario = this.form.getRawValue();

    const formula: Formula = {
      id: valoresFormulario.id!,
      codigo: valoresFormulario.codigo!,
      nome: valoresFormulario.nome || null,
      ingredientes: valoresFormulario.ingredientes! as Ingrediente[],
    };

    const evento: FormulaSalva = {
      formula,
      tipo: this.tipo(),
    };

    this.salvarAcionado.emit(evento);
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

  private iniciarEdicao(formula: Formula) {
    this.tipo.set('edicao');
    this.codigo.disable();
    this.form.patchValue(formula!);
    formula!.ingredientes.forEach(ingrediente => {
      this.adicionarIngrediente(ingrediente.codigo, ingrediente.nome || '');
    });
  }
}
