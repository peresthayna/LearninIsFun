import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reacoes-leo',
  templateUrl: './reacoes-leo.component.html',
  styleUrls: ['./reacoes-leo.component.css']
})
export class ReacoesLeoComponent implements OnInit {

  @Input() ativarCurioso: boolean = true;
  @Input() ativarFeliz: boolean = false;
  @Input() ativarTriste: boolean = false;
  @Input() ativarOk: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
