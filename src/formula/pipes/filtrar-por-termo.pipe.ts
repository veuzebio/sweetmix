import { Pipe, PipeTransform } from "@angular/core";
import { Formula } from "@shared/models";

type FormulaProp = keyof Formula;
const PROPRIEDADE_PADRAO: FormulaProp = 'codigo';

@Pipe({
  name: 'filtrarPorTermo'
})
export class FiltrarPorTermoPipe implements PipeTransform {
  transform(formulas: Formula[], termo: string, propriedades?: FormulaProp[]): Formula[] {
    if (!termo) return formulas; // Retorna todas as fórmulas se não houver termo

    return formulas.filter(formula => 
      this.filtrarPorTermo(formula, termo, propriedades || [PROPRIEDADE_PADRAO])
    );
  }

  private filtrarPorTermo(formula: Formula, termo: string, propriedades: FormulaProp[]): boolean {
    return propriedades.some(propriedade => {
      const valor = formula[propriedade];

      if (typeof valor === 'string' && valor.trim()) {
        return valor.trim().toLowerCase().includes(termo.trim().toLowerCase());
      }

      return false;
    });
  }
}