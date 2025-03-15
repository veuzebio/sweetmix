import { Formula } from "./formula";

export interface ResultadoAnalisePar {
  id: string;
  formulasUtilizadas: Map<string, Formula>;
  compatibilidade: boolean;
  ingredientesComuns: string[];
  ingredientesDiferentes: string[];
}