import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Formula, ValidacaoModelo } from '@shared/models';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormulaService {
  private API_URI = 'http://localhost:3000/formulas';
  private http = inject(HttpClient);

  filtro = signal<string>('');
  idSelecionado = signal<string | null>(null);
  formulasResource = httpResource<Formula[]>(() => `${this.API_URI}`, { defaultValue: []});
  formulaSelecionadaResource = httpResource<Formula | null>(() => `${this.API_URI}/${this.idSelecionado()}`, { defaultValue: null });

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

  excluirFormula(formula: Formula) {
    return this.http.delete<Formula>(`${this.API_URI}/${formula.id}`);
  }

  private obterFormulas(filtro?: string) {
    const params = new URLSearchParams();
    
    if (!!filtro) {
      params.append('codigo_like', filtro);
    }

    return `${this.API_URI}?${params.toString()}`;
  }
}
