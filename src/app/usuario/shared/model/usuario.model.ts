export class Usuario {
  id: number;
  nome: string;
  avatar: string;
  pontos: number;
  nivel: number;

  constructor(nome?: string, avatar?: string) {
    this.nome = nome;
    this.avatar = avatar;
    this.pontos = 0;
    this.nivel = 0;
  }
}