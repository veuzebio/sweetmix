import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import {
  SweetmixInputComponent,
  SweeetmixIconEnterComponent,
} from '@shared/components';
import {
  SweetmixButtonDirective,
  SweetmixAutoFocusDirective,
} from '@shared/directives';
import { codigosValidator } from './validators';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetmixInputComponent,
    SweetmixButtonDirective,
    SweetmixAutoFocusDirective,
    SweeetmixIconEnterComponent,
  ],
  selector: 'for-formulario-pesquisa-codigos',
  templateUrl: 'formulario-pesquisa-codigos.component.html',
})
export class FormularioPesquisaCodigosComponent {
  private fb = inject(FormBuilder);

  buscarAcionado = output<string[]>();

  form = this.fb.group({
    codigos: this.fb.array([this.criarElemento()], codigosValidator),
  });

  get codigos(): FormArray {
    return this.form.get('codigos') as FormArray;
  }

  get codigosInvalidos(): boolean {
    const erroDetectado = Object.keys(this.codigos.errors ?? {}).length > 0
    return erroDetectado && this.form.touched;
  }

  criarElemento(): FormControl {
    return this.fb.control('', Validators.required);
  }
  
  adicionarCodigo(): void {
    this.codigos.push(this.criarElemento());
  }

  removerCodigo(indice: number): void {
    if (this.codigos.controls.length === 1) return;

    this.codigos.removeAt(indice);
  }

  buscar(): void {
    const codigos = (this.codigos.value as string[]).filter((codigo) => !!codigo);
    this.buscarAcionado.emit(codigos);
  }
}
