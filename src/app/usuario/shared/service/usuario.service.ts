import { Usuario } from './../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly URL: string = 'http://127.0.0.1:8080/usuario';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL);
  }

  public getUsuariosOrdenadosNome(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL+'/ordenarNomes');
  }

  public getUsuariosOrdenadosPontos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL+'/ordenarPontos');
  }

  public getUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.URL+'/'+id);
  }

  public cadastrarUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.URL, usuario);
  }

  public atualizarUsuario(idUsuario: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.URL+'/atualizarUsuario/'+idUsuario, usuario);
  }

}
