import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-escolher-tema',
  templateUrl: './escolher-tema.component.html',
  styleUrls: ['./escolher-tema.component.css']
})
export class EscolherTemaComponent implements OnInit {
  
  public literals: any;

  constructor(private interService: InternacionalizacaoService,
    private router: Router) { this.literals = this.interService.getIdioma(); }

  ngOnInit() {
  }

  public redirect(idTema: number) {
    this.router.navigate(['/escolherJogo/'+idTema]);
  }

}
