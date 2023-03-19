import { Router } from '@angular/router';
import { Usuario } from './../shared/model/usuario.model';
import { UsuarioService } from './../shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css', '../shared/style.css']
})
export class CriarUsuarioComponent implements OnInit {

  public nomeUsuario: string;
  public avatarUsuario: string;
  public completo: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
  }

  public select(id: number): void {
    this.avatarUsuario = 'avatar-' + id + '.png';
    this.refresh();
  }

  public refresh(): void {
    if(this.nomeUsuario) {
      this.completo = true;
    } else {
      this.completo = false;
    }
  }

  public cadastrar(): void {
    let usuario: Usuario = new Usuario(this.nomeUsuario, this.avatarUsuario);
    this.usuarioService.cadastrarUsuario(usuario).subscribe( () => {
      this.usuarioService.getUsuarios().subscribe(usuarios => {
        usuario.id = usuarios[usuarios.length-1].id;
        localStorage.setItem('usuario', (usuario.id).toString());
        this.router.navigate(['/escolherTema']);
      })
    },
    (httpErrorResponse: HttpErrorResponse) => {
      alert('Erro ao criar jogador!');
    });
  }

}
