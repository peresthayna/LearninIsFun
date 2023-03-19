import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { Usuario } from './../../usuario/shared/model/usuario.model';
import { EmbaralharListaService } from 'src/app/shared/service/embaralha-lista.service';
import { InternacionalizacaoService } from 'src/app/main/internacionalizacao/internacionalizacao.service';
import { Component, OnInit } from '@angular/core';
import { PuzzleDuasRespostas } from 'src/app/shared/model/puzzle-duas-respostas.model';
import { Drop } from 'src/app/shared/model/drop.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { DropDuasRespostas } from 'src/app/shared/model/drop-duas-respostas.model';

@Component({
  selector: 'app-quantidade-formas',
  templateUrl: './quantidade-formas.component.html',
  styleUrls: ['./quantidade-formas.component.css','../shared/style.css']
})
export class QuantidadeFormasComponent implements OnInit {

  public literals: any;
  public formas: PuzzleDuasRespostas[] = [ 
    { imagem: '../../../assets/matematica/quantidade-formas/1.jpg', posicaoCorreta: [0, 3] },
    { imagem: '../../../assets/matematica/quantidade-formas/2.jpg', posicaoCorreta: [2, 5] },
    { imagem: '../../../assets/matematica/quantidade-formas/3.jpg', posicaoCorreta: [1, 4] },
    { imagem: '../../../assets/matematica/quantidade-formas/4.jpg', posicaoCorreta: [2, 5] },
    { imagem: '../../../assets/matematica/quantidade-formas/5.jpg', posicaoCorreta: [1, 4] },
    { imagem: '../../../assets/matematica/quantidade-formas/6.jpg', posicaoCorreta: [0, 3] }
  ];
  public listaDrop: Drop[] = [];
  public x: string[] = ['-30px','243px'];
  public y: string[] = ['-2px','119px','235px'];
  public acertou: boolean[] = [false, false, false, false, false, false];
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
      { posicao: 0, posicaoX: this.x[0], posicaoY: this.y[0], puzzleList: []},
      { posicao: 1, posicaoX: this.x[1], posicaoY: this.y[0], puzzleList: []},
      { posicao: 2, posicaoX: this.x[0], posicaoY: this.y[1], puzzleList: []},
      { posicao: 3, posicaoX: this.x[1], posicaoY: this.y[1], puzzleList: []},
      { posicao: 4, posicaoX: this.x[0], posicaoY: this.y[2], puzzleList: []},
      { posicao: 5, posicaoX: this.x[1], posicaoY: this.y[2], puzzleList: []}
    ];
  }

  public drop(event: CdkDragDrop<PuzzleDuasRespostas[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  public dropResposta(event: CdkDragDrop<PuzzleDuasRespostas[]>, drop: DropDuasRespostas) {
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

  public verificaRespostas(drop: DropDuasRespostas): void {
    if(drop.puzzleList[0].posicaoCorreta.includes(drop.posicao)) {
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
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5]) {
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
