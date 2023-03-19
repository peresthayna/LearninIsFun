import { Router } from '@angular/router';
import { InternacionalizacaoService } from './../../main/internacionalizacao/internacionalizacao.service';
import { UsuarioService } from './../shared/service/usuario.service';
import { Usuario } from './../shared/model/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecionar-usuario',
  templateUrl: './selecionar-usuario.component.html',
  styleUrls: ['./selecionar-usuario.component.css', '../shared/style.css']
})
export class SelecionarUsuarioComponent implements OnInit {

  public usuarios: Usuario[] = [];
  literals: any;

  constructor(private usuarioService: UsuarioService,
    private interService: InternacionalizacaoService,
    private router: Router) { }

  ngOnInit() {
    this.getUsuarios();
    this.literals = this.interService.getIdioma();
  }

  public getUsuarios(): void {
    this.usuarioService.getUsuariosOrdenadosNome().subscribe(usuarios => this.usuarios = usuarios);
  }

  public selecionarJogador(usuario: Usuario): void {
    localStorage.setItem('usuario', (usuario.id).toString());
    this.router.navigate(['/escolherTema']);
  }

}
