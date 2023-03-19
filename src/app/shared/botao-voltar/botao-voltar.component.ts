import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-botao-voltar',
  templateUrl: './botao-voltar.component.html',
  styleUrls: ['./botao-voltar.component.css']
})
export class BotaoVoltarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public voltar(): void {
    window.history.back();
  }

}
