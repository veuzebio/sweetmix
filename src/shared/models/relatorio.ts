import { Formula } from "./formula";

export interface Relatorio {
  id: string;
  formulasUtilizadas: Map<string, Formula>;
  compatibilidade: boolean;
  ingredientesComuns: string[];
  ingredientesDiferentes: string[];
}