import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetmixInputComponent } from '@shared/components';
import { AutoFocusDirective, SweetmixButtonDirective } from '@shared/directives';
import { Formula, Relatorio } from '@shared/models';
import { ComparadorService, FormulaService, RelatorioService } from '@shared/services';

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
  private comparadorService = inject(ComparadorService);
  private relatorioService = inject(RelatorioService);
  private fb = inject(FormBuilder);

  formulasEncontradas = signal<Formula[]>([]);
  relatorios = signal<Relatorio[]>([]);

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
    const codigos = (this.codigos.value as string[]).filter((codigo) => !!codigo);
    console.log('buscando por codigos', codigos);
    
    this.formulaService
      .obterFormulasPorCodigos(codigos)
      .subscribe((formulas) => {
        console.log('formulas encontradas', formulas);
          this.formulasEncontradas.set(formulas);
      });
  }

  comparar(): void {
    const relatorios = this.comparadorService.compararFormulas(this.formulasEncontradas());
    this.relatorios.set(relatorios);
    console.log('relatorios', relatorios);
  }

  salvarResultado(): void {
    this.relatorioService.salvarRelatorios(this.relatorios()).subscribe();
  }
}
