import { Formula } from "./formula";
import { ResultadoAnalisePar } from "./resultado-analise-par";

export interface ResultadoAnaliseCompleta {
  id: string;
  codigos: string[];
  formulas: Map<string, Formula>;
  resultados: ResultadoAnalisePar[];
}