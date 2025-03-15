import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetmixInputComponent } from '@shared/components';
import { AutoFocusDirective, SweetmixButtonDirective } from '@shared/directives';
import { Formula, ResultadoAnalisePar } from '@shared/models';
import { AnaliseCompatibilidadeService, FormulaService } from '@shared/services';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SweetmixInputComponent,
    SweetmixButtonDirective,
    AutoFocusDirective
  ],
  templateUrl: 'analise-compatibilidade.component.html',
})
export class AnaliseCompatibilidadeComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private analiseService = inject(AnaliseCompatibilidadeService);
  private fb = inject(FormBuilder);

  formulasEncontradas = signal<Formula[]>([]);
  resultados = signal<ResultadoAnalisePar[]>([]);

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

  analisar(): void {
    const resultados = this.analiseService.analisarFormulas(this.formulasEncontradas());
    this.resultados.set(resultados);
    console.log('resultados', resultados);
  }

  salvarResultado(): void {
    this.analiseService.salvarResultadoAnalise(this.resultados()).subscribe();
  }
}
