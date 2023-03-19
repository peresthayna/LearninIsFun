import { Usuario } from './../../usuario/shared/model/usuario.model';
import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { InternacionalizacaoService } from './../../main/internacionalizacao/internacionalizacao.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Drop } from 'src/app/shared/model/drop.model';
import { Puzzle } from 'src/app/shared/model/puzzle.model';
import { EmbaralharListaService } from 'src/app/shared/service/embaralha-lista.service';

@Component({
  selector: 'app-corpo-humano',
  templateUrl: './corpo-humano.component.html',
  styleUrls: ['./corpo-humano.component.css','../shared/style.css']
})
export class CorpoHumanoComponent implements OnInit {

  public partesDoCorpo: Puzzle[] = [ 
    { imagem: '../../../assets/ciencias/corpoHumano/1.png', posicaoCorreta: 0 },
    { imagem: '../../../assets/ciencias/corpoHumano/2.png', posicaoCorreta: 4 },
    { imagem: '../../../assets/ciencias/corpoHumano/3.png', posicaoCorreta: 2 },
    { imagem: '../../../assets/ciencias/corpoHumano/4.png', posicaoCorreta: 6 },
    { imagem: '../../../assets/ciencias/corpoHumano/5.png', posicaoCorreta: 8 },
    { imagem: '../../../assets/ciencias/corpoHumano/6.png', posicaoCorreta: 9 },
    { imagem: '../../../assets/ciencias/corpoHumano/7.png', posicaoCorreta: 7 },
    { imagem: '../../../assets/ciencias/corpoHumano/8.png', posicaoCorreta: 5 },
    { imagem: '../../../assets/ciencias/corpoHumano/9.png', posicaoCorreta: 1 },
    { imagem: '../../../assets/ciencias/corpoHumano/10.png', posicaoCorreta: 3 }
  ];
  public listaDrop: Drop[] = [];
  public x: string[] = ['30px','387px'];
  public y: string[] = ['2px','92px','180px','270px','360px'];
  public acertou: boolean[] = [false, false, false, false, false, false, false, false, false, false];
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
    this.carregarDrops();
    this.literals = this.interService.getIdioma();
  }

  public carregarDrops() {
    this.embaralhaListaService.embaralhaLista(this.partesDoCorpo);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: []},
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: []},
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: []},
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: []},
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: []},
      { posicao: 6, posicaoX: this.x[0], posicaoY: this.y[3], puzzleList: []},
      { posicao: 7, posicaoX: this.x[1], posicaoY: this.y[3], puzzleList: []},
      { posicao: 8, posicaoX: this.x[0], posicaoY: this.y[4], puzzleList: []},
      { posicao: 9, posicaoX: this.x[1], posicaoY: this.y[4], puzzleList: []}
    ];
  }

  public drop(event: CdkDragDrop<Puzzle[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public dropResposta(event: CdkDragDrop<Puzzle[]>, drop: Drop) {
    if(drop.puzzleList.length > 0) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
      );
    this.verificaRespostas(drop);
  }

  public verificaRespostas(drop: Drop): void {
    if(drop.posicao === drop.puzzleList[0].posicaoCorreta) {
      this.acertou[drop.posicao] = true;
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = true;
      this.ativarLeoTriste = false;
      this.adicionarPontos();
    } else {
      this.tirarPontos();
      this.acertou[drop.posicao] = false;
      this.ativarLeoCurioso = false;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = true;
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5] && this.acertou[6] && this.acertou[7] && this.acertou[8] && this.acertou[9]) {
      this.acertouTudo = true;
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
