import { UsuarioService } from './../../usuario/shared/service/usuario.service';
import { Usuario } from './../../usuario/shared/model/usuario.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public idUsuario: number;
  public usuario: Usuario = new Usuario();
  @Input() set podeRecarregar(recarregar: boolean) {
    this.recarregar();
  }
    
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarRequisicao();
  }
  
  public recarregar() {
    this.carregarRequisicao();
  }
  
  public carregarRequisicao() {
    this.idUsuario = parseInt(localStorage.getItem('usuario'));
    this.usuarioService.getUsuarioPorId(this.idUsuario).subscribe(usuario => this.usuario = usuario);
  }

}
