import { CommonModule, DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Directive, inject, Input, input, OnInit, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { SweetmixInputComponent } from '@shared/components';
import { SweetmixAutoFocusDirective, SweetmixButtonDirective, SweetmixNavigateOnInitDirective } from '@shared/directives';
import { Formula, ResultadoAnalisePar } from '@shared/models';
import { AnaliseCompatibilidadeService, FormulaService } from '@shared/services';

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

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SweetmixInputComponent,
    SweetmixButtonDirective,
    SweetmixAutoFocusDirective,
    SweetmixNavigateOnInitDirective
  ],
  templateUrl: 'analise-compatibilidade.component.html',
})
export class AnaliseCompatibilidadeComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private analiseService = inject(AnaliseCompatibilidadeService);
  private fb = inject(FormBuilder);

  formulasEncontradas = signal<Formula[]>([]);
  codigosNaoEncontrados = signal<string[]>([]);
  resultados = signal<ResultadoAnalisePar[]>([]);

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

  ngOnInit(): void {}

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
    this.resultados.set([]);

    const codigos = (this.codigos.value as string[]).filter((codigo) => !!codigo);
    
    this.formulaService
      .obterFormulasPorCodigos(codigos)
      .subscribe((formulas) => {
          this.formulasEncontradas.set(formulas);

          const codigosNaoEncontrados = codigos.filter((codigo) => !formulas.map(formula => formula.codigo).includes(codigo));
          this.codigosNaoEncontrados.set(codigosNaoEncontrados);
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

  limpar(): void {
    this.formulasEncontradas.set([]);
    this.codigosNaoEncontrados.set([]);
    this.resultados.set([]);
    this.form.reset();
    this.codigos.clear();
    this.adicionarCodigo();
  }
}
