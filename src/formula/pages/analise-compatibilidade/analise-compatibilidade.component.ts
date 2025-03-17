import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  SweetmixButtonDirective,
  SweetmixNavigateOnInitDirective
} from '@shared/directives';
import { Formula, ResultadoAnalisePar } from '@shared/models';
import {
  AnaliseCompatibilidadeService,
  FormulaService,
} from '@shared/services';
import { FormularioPesquisaCodigosComponent } from '../../components';
import { SweetmixPanelComponent } from "../../../shared/components/panel/sweetmix-panel.component";

@Component({
  imports: [
    CommonModule,
    FormularioPesquisaCodigosComponent,
    SweetmixButtonDirective,
    SweetmixNavigateOnInitDirective,
    SweetmixPanelComponent
],
  templateUrl: 'analise-compatibilidade.component.html',
})
export class AnaliseCompatibilidadeComponent implements OnInit {
  private formulaService = inject(FormulaService);
  private analiseService = inject(AnaliseCompatibilidadeService);

  formulasEncontradas = signal<Formula[]>([]);
  codigosNaoEncontrados = signal<string[]>([]);
  resultados = signal<ResultadoAnalisePar[]>([]);

  ngOnInit(): void {}

  buscar(codigos: string[]): void {
    this.resultados.set([]);

    this.formulaService
      .obterFormulasPorCodigos(codigos)
      .subscribe((formulas) => {
        this.formulasEncontradas.set(formulas);

        const codigosNaoEncontrados = codigos.filter(
          (codigo) =>
            !formulas.map((formula) => formula.codigo).includes(codigo)
        );
        this.codigosNaoEncontrados.set(codigosNaoEncontrados);
      });
  }

  analisar(): void {
    const resultados = this.analiseService.analisarFormulas(
      this.formulasEncontradas()
    );
    this.resultados.set(resultados);
    console.log('resultados', resultados);
  }

  salvarResultado(): void {
    this.analiseService.salvarResultadoAnalise(this.resultados()).subscribe();
  }
}
