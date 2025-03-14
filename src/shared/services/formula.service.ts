import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Formula, ValidacaoModelo } from '@shared/models';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormulaService {
  private API_URI = 'http://localhost:3000/formulas';
  private http = inject(HttpClient);

  obterFormulas(): Observable<Formula[]> {
    return this.http.get<Formula[]>(this.API_URI);
  }

  obterFormulaPorId(id: string): Observable<Formula> {
    return this.http.get<Formula>(`${this.API_URI}/${id}`);
  }

  obterFormulasPorCodigos(codigos: string[]): Observable<Formula[]> {
    if (codigos.length === 0) return of([]);
    
    const params = new URLSearchParams();

    codigos.forEach((codigo) => params.append('codigo', codigo));

    return this.http.get<Formula[]>(`${this.API_URI}?${params.toString()}`);
  }

  cadastrarNovaFormula(formula: Formula): Observable<Formula> {
    return this.http.post<Formula>(this.API_URI, formula);
  }

  atualizarFormula(formula: Formula): Observable<Formula> {
    return this.http.put<Formula>(`${this.API_URI}/${formula.id}`, formula);
  }

  excluirFormula(formula: Formula) {
    return this.http.delete<Formula>(`${this.API_URI}/${formula.id}`);
  }
}
