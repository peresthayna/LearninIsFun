import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { Usuario } from './../../usuario/shared/model/usuario.model';
import { InternacionalizacaoService } from './../../main/internacionalizacao/internacionalizacao.service';
import { ParteDoCorpo } from './../shared/model/parte-do-corpo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quantos-temos',
  templateUrl: './quantos-temos.component.html',
  styleUrls: ['./quantos-temos.component.css','../shared/style.css']
})
export class QuantosTemosComponent implements OnInit {

  public partesDoCorpo: ParteDoCorpo[] = [
    { id: 0, imagem: '../../assets/matematica/quantos-temos/olho.png', quantidade: 2, checkbox: [false, false] },
    { id: 1, imagem: '../../assets/matematica/quantos-temos/mão.png', quantidade: 2, checkbox: [false, false] },
    { id: 2, imagem: '../../assets/matematica/quantos-temos/boca.png', quantidade: 1, checkbox: [false, false] },
    { id: 3, imagem: '../../assets/matematica/quantos-temos/pé.png', quantidade: 2, checkbox: [false, false] },
    { id: 4, imagem: '../../assets/matematica/quantos-temos/orelha.png', quantidade: 2, checkbox: [false, false] },
    { id: 5, imagem: '../../assets/matematica/quantos-temos/nariz.png', quantidade: 1, checkbox: [false, false] }
  ];
  public acertou: boolean[] = [false, false, false, false, false, false];
  public acertouTudo: boolean = false;
  public auxiliar: boolean;
  public ativarLeoCurioso: boolean = true;
  public ativarLeoFeliz: boolean = false;
  public ativarLeoTriste: boolean = false;
  public literals: any;
  public usuario: Usuario = new Usuario();
  public recarregarPerfil: boolean = false;

  constructor(
    private interService: InternacionalizacaoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.literals = this.interService.getIdioma();
  }

  public mudouValor(parte: ParteDoCorpo) {
    if(parte.id == 0 || parte.id == 1 || parte.id == 3 || parte.id == 4) {
      parte.checkbox[0] && parte.checkbox[1] ? this.auxiliar = true : this.auxiliar = false;
      if(this.auxiliar) {
        this.acertou[parte.id] = true;
        this.ativarLeoFeliz = true;
        this.ativarLeoTriste = false;
        this.ativarLeoCurioso = false;
        this.adicionarPontos();
      } else {
        this.acertou[parte.id] = false;
        this.ativarLeoFeliz = false;
        this.ativarLeoTriste = false;
        this.ativarLeoCurioso = true;
      }
    } else {
      if(parte.checkbox[0]) {
        parte.checkbox[1] ? this.auxiliar = false : this.auxiliar = true;
      } else if (parte.checkbox[1]) {
        parte.checkbox[0] ? this.auxiliar = false : this.auxiliar = true;
      }
      if(this.auxiliar) {
        this.acertou[parte.id] = true;
        this.ativarLeoFeliz = true;
        this.ativarLeoTriste = false;
        this.ativarLeoCurioso = false;
        this.adicionarPontos();
      } else {
        this.tirarPontos();
        this.acertou[parte.id] = false;
        this.ativarLeoFeliz = false;
        this.ativarLeoTriste = true;
        this.ativarLeoCurioso = false;
      }
    }
    if(this.acertou[0] && this.acertou[1] && this.acertou[2] && this.acertou[3] && this.acertou[4] && this.acertou[5]) {
      this.acertouTudo = true;
      this.ativarLeoFeliz = false;
      this.ativarLeoTriste = false;
      this.ativarLeoCurioso = false;
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
