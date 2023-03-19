import { Usuario } from './../../usuario/shared/model/usuario.model';
import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { DropItem } from '../shared/model/drop-item.model';
import { Objeto } from '../shared/model/objeto.model';
import { EmbaralharListaService } from 'src/app/shared/service/embaralha-lista.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { InternacionalizacaoService } from 'src/app/main/internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-alfabeto',
  templateUrl: './alfabeto.component.html',
  styleUrls: ['./alfabeto.component.css','../shared/style.css']
})
export class AlfabetoComponent implements OnInit {

  alfabeto: DropItem[] = [];
  macas: Objeto[] = [];
  lista: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public acertou: boolean[] = [];
  public acertouTudo: boolean = false;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public literals: any;
  private usuario: Usuario = new Usuario();
  public recarregarPerfil: boolean = false;
  
  constructor(private embaralharListaService: EmbaralharListaService,
    private interService: InternacionalizacaoService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.macas = this.getMacas(this.lista);
    this.alfabeto = this.getLetras(this.lista);
    this.literals = this.interService.getIdioma();
  }
  
  public getLetras(lista: string[]): DropItem[] {
    let alfabeto: DropItem[] = [];
    let x: string[] = ['250px','200px','290px','150px','240px','330px','80px','410px','180px','460px','370px','240px',
    '100px','150px','50px','420px','230px','300px','170px','480px','360px','230px','100px','30px','450px','295px'];
    let y: string[] = ['10px','30px','40px','50px','60px','70px','80px','90px','100px','110px','120px','130px',
    '140px','150px','160px','170px','180px','190px','200px','210px','220px','230px','240px','250px','260px','135px'];
    this.embaralharListaService.embaralhaLista(this.lista);
    for(let i=0; i<lista.length; i++) {
      alfabeto[i] = new DropItem;
      alfabeto[i].letra = lista[i];
      alfabeto[i].posicaoX = x[i];
      alfabeto[i].posicaoY = y[i];
      alfabeto[i].posicao = i;
      alfabeto[i].listaObjetos = [];
    }
    return alfabeto;
  }

  public getMacas(lista: string[]): Objeto[] {
    let macas: Objeto[] = [];
    for(let i=0; i<lista.length; i++) {
      macas[i] = new Objeto;
      macas[i].letra = lista[i];
      macas[i].imagem = '/assets/linguagens/alfabeto/' + (i+1) + '.png';
    }
    return macas;
  }

  public drop(event: CdkDragDrop<Objeto[]>, drop: DropItem): void {
    if(drop.listaObjetos.length > 0) {
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

  public verificaRespostas(drop: DropItem): void {
    if(drop.letra === drop.listaObjetos[0].letra) {
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
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5] && this.acertou[6] && this.acertou[7] && this.acertou[8] && this.acertou[9] && this.acertou[3] && this.acertou[10] && this.acertou[11] && this.acertou[12] && this.acertou[13] && this.acertou[14] && this.acertou[15] && this.acertou[16] && this.acertou[17] && this.acertou[18] && this.acertou[19] && this.acertou[20] && this.acertou[21] && this.acertou[22] && this.acertou[23] && this.acertou[24] && this.acertou[25]) {
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
