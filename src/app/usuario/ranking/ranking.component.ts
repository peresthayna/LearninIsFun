import { InternacionalizacaoService } from './../../main/internacionalizacao/internacionalizacao.service';
import { Usuario } from './../shared/model/usuario.model';
import { UsuarioService } from './../shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css', '../shared/style.css']
})
export class RankingComponent implements OnInit {

  public usuarios: Usuario[] = [];
  literals: any;

  constructor(private usuarioService: UsuarioService,
    private interService: InternacionalizacaoService) { }

  ngOnInit() {
    this.getUsuarios();
    this.literals = this.interService.getIdioma();
  }

  public getUsuarios(): void {
    this.usuarioService.getUsuariosOrdenadosPontos().subscribe(usuarios => this.usuarios = usuarios);
  }

}
