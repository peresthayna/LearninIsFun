import { Categoria } from './categoria.model';
export class Tema {
  nome: string;
  background: string;
  categorias: Categoria[] = [];
}