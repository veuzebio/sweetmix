import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetmixInputComponent } from '@shared/components';
import { AutoFocusDirective, SweetmixButtonDirective } from '@shared/directives';
import { Formula } from '@shared/models';
import { FormulaService } from '@shared/services';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SweetmixInputComponent,
    SweetmixButtonDirective,
    AutoFocusDirective
  ],
  templateUrl: 'comparador.component.html',
})
export class ComparadorComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private fb = inject(FormBuilder);

  // codigo = signal('');
  formulasEncontradas = signal<Formula[]>([]);
  formulasNaoEncontradas = signal<Formula[]>([]);

  form = this.fb.group({
    codigos: this.fb.array([this.criarElemento()]),
  });

  get codigos(): FormArray {
    return this.form.get('codigos') as FormArray;
  }

  ngOnInit(): void {}

  criarElemento(): FormControl {
    return this.fb.control('');
  }
  
  adicionarCodigo(): void {
    this.codigos.push(this.criarElemento());
  }

  removerCodigo(indice: number): void {
    if (this.codigos.controls.length === 1) return;

    this.codigos.removeAt(indice);
  }

  buscar(): void {
    const codigos: string[] = this.codigos.value;
    console.log('buscando por codigos', codigos);
    
    this.formulaService
      .obterFormulasPorCodigos(codigos)
      .subscribe((formulas) => {
        console.log('formulas encontradas', formulas);
          this.formulasEncontradas.set(formulas);
      });
  }

  comparar(): void {}
}
