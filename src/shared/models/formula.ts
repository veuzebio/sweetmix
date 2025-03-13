import { Ingrediente } from "./ingrediente";

export interface Formula {
    id: string;
    codigo: string;
    nome: string | null;
    ingredientes: Ingrediente[];
}