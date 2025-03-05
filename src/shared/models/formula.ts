import { Ingrediente } from "./ingrediente";

export interface Formula {
    codigo: string;
    nome: string | null;
    ingredientes: Ingrediente[];
}