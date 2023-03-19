import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { EmbaralharListaService } from './../../shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from './../../main/internacionalizacao/internacionalizacao.service';
import { Usuario } from './../../usuario/shared/model/usuario.model';
import { Drop } from './../../shared/model/drop.model';
import { Puzzle } from './../../shared/model/puzzle.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css','../shared/style.css']
})
export class AnimaisComponent implements OnInit {

  public literals: any;
  public formas: Puzzle[] = [ 
    { imagem: '../../../assets/ciencias/animais/cachorro.png', posicaoCorreta: 1 },
    { imagem: '../../../assets/ciencias/animais/coelho.png', posicaoCorreta: 0 },
    { imagem: '../../../assets/ciencias/animais/macaco.png', posicaoCorreta: 2 },
    { imagem: '../../../assets/ciencias/animais/gato.png', posicaoCorreta: 3 }
  ];
  public listaDrop: Drop[] = [];
  public x: string[] = ['-125px','25px','175px','325px'];
  public y: string = '50px';
  public acertou: boolean[] = [false, false, false, false];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public usuario: Usuario = new Usuario();
  public recarregarPerfil: boolean = false;

  constructor(
    private interService: InternacionalizacaoService,
    private embaralharListaService: EmbaralharListaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
    this.carregarDrops();
  }

  public carregarDrops() {
    this.embaralharListaService.embaralhaLista(this.formas);
    this.listaDrop = [
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y, puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y, puzzleList: []},
      { posicao: 2, posicaoX: this.x[2], posicaoY: this.y, puzzleList: []},
      { posicao: 3, posicaoX: this.x[3], posicaoY: this.y, puzzleList: []}
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
    if(drop.puzzleList[0].posicaoCorreta == drop.posicao) {
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
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3]) {
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
