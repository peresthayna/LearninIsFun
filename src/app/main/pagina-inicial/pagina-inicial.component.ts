import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { InternacionalizacaoService } from '../internacionalizacao/internacionalizacao.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  public literals: any;

  constructor(private interService: InternacionalizacaoService) { }

  ngOnInit(): void {
    this.literals = this.interService.getIdioma();
  }

}
