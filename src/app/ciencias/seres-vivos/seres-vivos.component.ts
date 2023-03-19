import { Usuario } from './../../usuario/shared/model/usuario.model';
import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { Palavra } from './../shared/model/palavra.model';
import { Component, OnInit } from '@angular/core';
import { InternacionalizacaoService } from 'src/app/main/internacionalizacao/internacionalizacao.service';
import { EmbaralharListaService } from 'src/app/shared/service/embaralha-lista.service';
import { Resposta } from '../shared/model/resposta.model';

@Component({
  selector: 'app-seres-vivos',
  templateUrl: './seres-vivos.component.html',
  styleUrls: ['./seres-vivos.component.css','../shared/style.css']
})
export class SeresVivosComponent implements OnInit {

  public palavras: Palavra[] = [];
  public alfabeto: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public ativarLeoOk: boolean = false;
  public literals: any;
  private usuario: Usuario = new Usuario();
  public recarregarPerfil: boolean = false;

  constructor(
    private embaralhaListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getPalavras();
    this.literals = this.interService.getIdioma();
  }

  public getPalavras(): void {
    this.ativarLeoCurioso = true;
    this.palavras[0] = new Palavra(); this.palavras[0].palavra = '_UMANO'; this.palavras[0].respostaCerta = 'H';
    this.palavras[1] = new Palavra(); this.palavras[1].palavra = '_ORBOLETA'; this.palavras[1].respostaCerta = 'B';
    this.palavras[2] = new Palavra(); this.palavras[2].palavra = '_ARTARUGA'; this.palavras[2].respostaCerta = 'T';
    this.palavras[3] = new Palavra(); this.palavras[3].palavra = '_OGUMELO'; this.palavras[3].respostaCerta = 'C';
    this.palavras[4] = new Palavra(); this.palavras[4].palavra = '_EIXE'; this.palavras[4].respostaCerta = 'P';
    this.palavras[5] = new Palavra(); this.palavras[5].palavra = '_APO'; this.palavras[5].respostaCerta = 'S';
    this.palavras[6] = new Palavra(); this.palavras[6].palavra = '_LOR'; this.palavras[6].respostaCerta = 'F';
    this.palavras[7] = new Palavra(); this.palavras[7].palavra = '_ALEIA'; this.palavras[7].respostaCerta = 'B';
    this.embaralhaListaService.embaralhaLista(this.alfabeto);
    for(let i=0; i<8; i++) {
      this.palavras[i].respostas[0] = new Resposta();
      this.palavras[i].respostas[1] = new Resposta();
      this.palavras[i].respostas[2] = new Resposta();
    }
    this.palavras[0].respostas[0].resposta = 'H'; 
    this.palavras[1].respostas[0].resposta = 'B';
    this.palavras[2].respostas[0].resposta = 'T';
    this.palavras[3].respostas[0].resposta = 'C';
    this.palavras[4].respostas[0].resposta = 'P';
    this.palavras[5].respostas[0].resposta = 'S';
    this.palavras[6].respostas[0].resposta = 'F';
    this.palavras[7].respostas[0].resposta = 'B';
    for(let i=0; i<8; i++) {
      this.palavras[i].imagem = '/assets/ciencias/seres-vivos/' + (i+1) + '.png';
      this.embaralhaListaService.embaralhaLista(this.alfabeto);
      for (let j = 1; j < 3; j++) {
        this.palavras[i].respostas[j] = new Resposta();
        if(this.alfabeto[j] == this.palavras[i].respostaCerta) {
          j--;
          this.embaralhaListaService.embaralhaLista(this.alfabeto);
        } else {
          this.palavras[i].respostas[j].resposta = this.alfabeto[j];
        }
      }
      for (let j=0; j<3; j++) {
        this.palavras[i].respostas[j].cor = '#ffffff';
        this.palavras[i].respostas[j].isBloqueado = false;
      }
      this.embaralhaListaService.embaralhaLista(this.palavras[i].respostas);
    }
    this.embaralhaListaService.embaralhaLista(this.palavras);
  }
  
  public verificarResposta(palavra: Palavra, resposta: Resposta)  {
    if(resposta.resposta === palavra.respostaCerta) {
      resposta.cor = '#00ff00';
      palavra.acertou = true;
      for(let i = 0; i < 3; i++) { 
        palavra.respostas[i].isBloqueado = true; 
      }
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = true;
      this.ativarLeoTriste = false;
      this.adicionarPontos();
    }
    else {
      this.tirarPontos();
      resposta.cor = '#ff0000';
      resposta.isBloqueado = true;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = true;
    }
    this.verificarAcertouTudo();
  }

  public verificarAcertouTudo(): void {
    this.acertouTudo = true; 
    for(let i=0; i<8; i++) {
      if(!this.palavras[i].acertou) { 
        this.acertouTudo = false; 
      }
    }
    if(this.acertouTudo) {
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = false;
      this.ativarLeoOk = true;
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
