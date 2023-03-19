import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { Usuario } from './../../usuario/shared/model/usuario.model';
import { Coracao } from './../shared/model/coracao.model';
import { InternacionalizacaoService } from './../../main/internacionalizacao/internacionalizacao.service';
import { Component, OnInit } from '@angular/core';
import { EmbaralharListaService } from 'src/app/shared/service/embaralha-lista.service';
import { Resposta } from '../shared/model/resposta.model';

@Component({
  selector: 'app-coracoes',
  templateUrl: './coracoes.component.html',
  styleUrls: ['./coracoes.component.css','../shared/style.css']
})
export class CoracoesComponent implements OnInit {

  public coracoes: Coracao[] = [];
  public lista: number[] = [];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public literals: any;
  public usuario: Usuario = new Usuario();
  public recarregarPerfil: boolean = false;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getCoracoes();
    this.literals = this.interService.getIdioma();
  }

  public getCoracoes(): void {
    this.ativarLeoCurioso = true;
    for(let i=0; i<10; i++) {
      this.lista[i] = i+1;
    }
    this.embaralhaListaService.embaralhaLista(this.lista);
    for(let i=0; i<8; i++) {
      this.coracoes[i] = new Coracao();
      this.coracoes[i].imagem = '/assets/matematica/coracoes/coracoes_' + this.lista[i] + '.png';
      this.coracoes[i].respostaCerta = this.lista[i];
      this.coracoes[i].posicao = i;
      this.coracoes[i].respostas[0] = new Resposta();
      this.coracoes[i].respostas[0].resposta = this.lista[i];
      let numeros: number[] = [];
      for (let j=1; j<10; j++) {
        if ((j)!==this.lista[i]) {
          numeros.push(j);
        }
      }
      this.embaralhaListaService.embaralhaLista(numeros);
      for (let j = 1; j < 3; j++) {
        this.coracoes[i].respostas[j] = new Resposta();
        this.coracoes[i].respostas[j].resposta = numeros[j];
      }
      for (let j=0; j<3; j++) {
        this.coracoes[i].respostas[j].cor = '#ffffff';
        this.coracoes[i].respostas[j].isBloqueado = false;
      }
      this.embaralhaListaService.embaralhaLista(this.coracoes[i].respostas);
    }
  }
  
  public verificarResposta(coracao: Coracao, resposta: Resposta)  {
    if(resposta.resposta === coracao.respostaCerta) {
      resposta.cor = '#00ff00';
      coracao.acertou = true;
      for(let i = 0; i < 3; i++) { 
        coracao.respostas[i].isBloqueado = true; 
      }
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = true;
      this.ativarLeoTriste = false;
      this.adicionarPontos();
    } else {
      this.tirarPontos();
      resposta.cor = '#ff0000';
      resposta.isBloqueado = true;
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = true;
    }
    this.verificarAcertouTudo();
  }

  public verificarAcertouTudo(): void {
    this.acertouTudo = true;
    for(let i=0; i<8; i++) {
      if(!this.coracoes[i].acertou) { 
        this.acertouTudo = false; 
      }
    }
    if(this.acertouTudo) {
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = false;
      this.adicionarNivel();
    }
  }

  public adicionarPontos(): void {
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario'))).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.pontos++;
      this.usuarioService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(usuario => this.recarregarPerfil = !this.recarregarPerfil);
    });
  }

  public adicionarNivel(): void {
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario'))).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.nivel++;
      this.usuario.pontos++;
      this.usuarioService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(usuario => this.recarregarPerfil = !this.recarregarPerfil);
    });
  }

  public tirarPontos(): void {
    this.usuarioService.getUsuarioPorId(parseInt(localStorage.getItem('usuario'))).subscribe(usuario => {
      this.usuario = usuario;
      this.usuario.pontos--;
      this.usuarioService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(usuario => this.recarregarPerfil = !this.recarregarPerfil);
    });
  }

}
