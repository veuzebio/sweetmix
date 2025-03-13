import { Pipe, PipeTransform } from "@angular/core";
import { Formula } from "@shared/models";

@Pipe({
  name: 'filtrarPorTermo'
})
export class FiltrarPorTermoPipe implements PipeTransform {

  transform(formulas: Formula[], termo: string): any {
    if (!termo) return formulas;
    return formulas.filter((formula) => formula.codigo.toLocaleLowerCase().includes(termo.toLocaleLowerCase()));
  }
}