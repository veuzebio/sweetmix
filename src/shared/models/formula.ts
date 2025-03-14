import { Ingrediente } from "./ingrediente";

export interface Formula {
    id: string | null;
    codigo: string;
    nome: string | null;
    ingredientes: Ingrediente[];
}