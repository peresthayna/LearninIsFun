import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public literals: any;

  constructor(
    private interService: InternacionalizacaoService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
  }

  public selecionarIdioma(idioma: string): void {
    localStorage.setItem('Language', idioma);
    window.location.reload();
  }

  public home(): void {
    this.router.navigate(['/']);
  }

  public redirect(index: number): void {
    this.router.navigate(['/escolherJogo/' + index]);
  }

  public verificarLogin(): void {
    
  }

}
