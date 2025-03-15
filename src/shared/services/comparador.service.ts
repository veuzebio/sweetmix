import { Injectable } from '@angular/core';
import { Formula, Relatorio } from '@shared/models';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ComparadorService {
  compararFormulas(formulas: Formula[]): Relatorio[] {
    const relatorios: Relatorio[] = [];
    const validas = formulas.filter((formula) => formula.ingredientes.length > 0);

    for (let i = 0; i < validas.length; i++) {
      for (let j = i + 1; j < validas.length; j++) {
        const formula1 = validas[i];
        const formula2 = validas[j];

        const relatorio = this.compararFormulasPares(formula1, formula2);
        relatorios.push(relatorio);
      }
    }

    return relatorios;
  }

  compararFormulasPares(formula1: Formula, formula2: Formula): Relatorio {
    const ingredientes1 = formula1.ingredientes.map((ingrediente) => ingrediente.codigo);
    const ingredientes2 = formula2.ingredientes.map((ingrediente) => ingrediente.codigo);

    const temEmFormula1 = ingredientes2.filter((i) => ingredientes1.includes(i));
    const temEmFormula2 = ingredientes1.filter((i) => ingredientes2.includes(i));
    const faltaEmFormula1 = ingredientes2.filter((i) => !ingredientes1.includes(i));
    const faltaEmFormula2 = ingredientes1.filter((i) => !ingredientes2.includes(i));
    const ehCompativel = faltaEmFormula1.length === 0 || faltaEmFormula2.length === 0;

    const relatorio: Relatorio = {
      id: uuid(),
      formulasUtilizadas: new Map([[formula1.codigo, formula1], [formula2.codigo, formula2]]),
      compatibilidade: ehCompativel,
      ingredientesComuns: [...temEmFormula1, ...temEmFormula2],
      ingredientesDiferentes: [...faltaEmFormula1, ...faltaEmFormula2],
    };

    return relatorio;
  }
}
