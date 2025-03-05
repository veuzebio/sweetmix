import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Formula, ValidacaoModelo } from '@shared/models';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormulaService {
  private http = inject(HttpClient);

  formulas$ = this.http.get<Formula[]>('http://localhost:3000/formulas');

  validarFormula(formula: Formula): ValidacaoModelo {
    const {codigo, ingredientes} = formula;
    const codigoIngredientes = ingredientes.map((ingrediente) => ingrediente.codigo);

    const validacao: ValidacaoModelo = {
      valido: true,
      observacoes: [],
    };

    if (!codigo) {
      validacao.valido = false;
      validacao.observacoes.push('Formula deve ter um código.');
    }

    if (codigoIngredientes.length < 1) {
      validacao.valido = false;
      validacao.observacoes.push('Formula deve ter pelo menos um ingrediente.');
    }

    return validacao;
  }

  cadastrarNovaFormula(formula: Formula): Observable<Formula> {
    const validacao = this.validarFormula(formula);

    if (validacao.valido === false) {
      return throwError(() => validacao.observacoes.join(', '));
    }

    return this.http.post<Formula>('http://localhost:3000/formulas', formula);
  }
}
