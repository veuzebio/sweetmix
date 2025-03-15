import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Formula, ResultadoAnaliseCompleta, ResultadoAnalisePar } from '@shared/models';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class AnaliseCompatibilidadeService {
  private API_URI = 'http://localhost:3000/resultados';
  private http = inject(HttpClient);

  salvarResultadoAnalise(resultadosPares: ResultadoAnalisePar[]) {
    const formulasUtilizadas = new Map<string, Formula>();

    resultadosPares.forEach((relatorio) => {
      relatorio.formulasUtilizadas.forEach((formula) => {
        formulasUtilizadas.set(formula.codigo, formula);
      });
    });

    const codigosUtilizados = Array.from(formulasUtilizadas.keys());

    const resultadoCompleto: ResultadoAnaliseCompleta = {
      id: uuid(),
      codigos: codigosUtilizados,
      formulas: formulasUtilizadas,
      resultados: resultadosPares,
    };
    
    return this.http.post<ResultadoAnaliseCompleta>(this.API_URI, resultadoCompleto);    
  }

  analisarFormulas(formulas: Formula[]): ResultadoAnalisePar[] {
    const relatorios: ResultadoAnalisePar[] = [];
    const validas = formulas.filter((formula) => formula.ingredientes.length > 0);

    for (let i = 0; i < validas.length; i++) {
      for (let j = i + 1; j < validas.length; j++) {
        const formula1 = validas[i];
        const formula2 = validas[j];

        const resultado = this.analisarPares(formula1, formula2);
        relatorios.push(resultado);
      }
    }

    return relatorios;
  }

  private analisarPares(formula1: Formula, formula2: Formula): ResultadoAnalisePar {
    const ingredientes1 = formula1.ingredientes.map((ingrediente) => ingrediente.codigo);
    const ingredientes2 = formula2.ingredientes.map((ingrediente) => ingrediente.codigo);

    const temEmFormula1 = ingredientes2.filter((i) => ingredientes1.includes(i));
    const temEmFormula2 = ingredientes1.filter((i) => ingredientes2.includes(i));
    const faltaEmFormula1 = ingredientes2.filter((i) => !ingredientes1.includes(i));
    const faltaEmFormula2 = ingredientes1.filter((i) => !ingredientes2.includes(i));
    const ehCompativel = faltaEmFormula1.length === 0 || faltaEmFormula2.length === 0;

    const resultado: ResultadoAnalisePar = {
      id: uuid(),
      formulasUtilizadas: new Map([[formula1.codigo, formula1], [formula2.codigo, formula2]]),
      compatibilidade: ehCompativel,
      ingredientesComuns: [...temEmFormula1, ...temEmFormula2],
      ingredientesDiferentes: [...faltaEmFormula1, ...faltaEmFormula2],
    };

    return resultado;
  }
}
