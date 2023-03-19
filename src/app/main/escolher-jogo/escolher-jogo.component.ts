import { InternacionalizacaoService } from './../internacionalizacao/internacionalizacao.service';
import { Tema } from './../shared/model/tema.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../shared/model/categoria.model';
import { Jogo } from '../shared/model/jogo.model';

@Component({
  selector: 'app-escolher-jogo',
  templateUrl: './escolher-jogo.component.html',
  styleUrls: ['./escolher-jogo.component.css']
})
export class EscolherJogoComponent implements OnInit {

  public literals: any;
  public temaAtual: Tema = new Tema();

  constructor(
    private interService: InternacionalizacaoService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.literals = this.interService.getIdioma();
    }

  ngOnInit() {
    this.temaAtual.categorias[0] = new Categoria();
    this.temaAtual.categorias[1] = new Categoria();
    this.temaAtual.categorias[0].jogos[0] = new Jogo();
    this.temaAtual.categorias[0].jogos[1] = new Jogo();
    this.temaAtual.categorias[1].jogos[0] = new Jogo();
    this.temaAtual.categorias[1].jogos[1] = new Jogo();
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id == 1) {
        this.temaAtual.nome = this.literals.tituloLin;
        this.temaAtual.background = '#FFB9DD';
        this.temaAtual.categorias[0].nome = this.literals.lp;
        this.temaAtual.categorias[0].imagem = '../../../assets/linguagens/abc.png';
        this.temaAtual.categorias[0].jogos[0].imagem = '../../../assets/linguagens/iniciais.jpg';
        this.temaAtual.categorias[0].jogos[0].link = '/jogoIniciais';
        this.temaAtual.categorias[0].jogos[1].imagem = '../../../assets/linguagens/arvore.png';
        this.temaAtual.categorias[0].jogos[1].link = '/jogoAlfabeto';
        this.temaAtual.categorias[1].nome = this.literals.arte;
        this.temaAtual.categorias[1].imagem = '../../../assets/linguagens/arte.png';
        this.temaAtual.categorias[1].jogos[0].imagem = '../../../assets/linguagens/pinceis.png';
        this.temaAtual.categorias[1].jogos[0].link = '/jogoCoresFrutas';
        this.temaAtual.categorias[1].jogos[1].imagem = '../../../assets/linguagens/paint.png';
        this.temaAtual.categorias[1].jogos[1].link = '/jogoCores';
      } else if(id == 2) {
        this.temaAtual.nome = this.literals.tituloMat;
        this.temaAtual.background = '#F6AAAA';
        this.temaAtual.categorias[0].nome = this.literals.quantidade;
        this.temaAtual.categorias[0].imagem = '../../../assets/matematica/num.png';
        this.temaAtual.categorias[0].jogos[0].imagem = '../../../assets/matematica/coracoes.png';
        this.temaAtual.categorias[0].jogos[0].link = '/jogoCoracoes';
        this.temaAtual.categorias[0].jogos[1].imagem = '../../../assets/matematica/partescorpo.png';
        this.temaAtual.categorias[0].jogos[1].link = '/jogoQuantidades';
        this.temaAtual.categorias[1].nome = this.literals.formasGeometricas;
        this.temaAtual.categorias[1].imagem = '../../../assets/matematica/formas.png';
        this.temaAtual.categorias[1].jogos[0].imagem = '../../../assets/matematica/formas2.png';
        this.temaAtual.categorias[1].jogos[0].link = '/jogoQuantidadeFormas';
        this.temaAtual.categorias[1].jogos[1].imagem = '../../../assets/matematica/formas3.png';
        this.temaAtual.categorias[1].jogos[1].link = '/jogoEncaixarFormas';
      } else if(id == 3) {
        this.temaAtual.nome = this.literals.tituloCie;
        this.temaAtual.background = '#A1DCFE';
        this.temaAtual.categorias[0].nome = this.literals.corpoHumano;
        this.temaAtual.categorias[0].imagem = '../../../assets/ciencias/corpohumano.png';
        this.temaAtual.categorias[0].jogos[0].imagem = '../../../assets/ciencias/corpo.png';
        this.temaAtual.categorias[0].jogos[0].link = '/jogoCorpoHumano';
        this.temaAtual.categorias[0].jogos[1].imagem = '../../../assets/ciencias/objetos.jpg';
        this.temaAtual.categorias[0].jogos[1].link = '/jogoAcessorios';
        this.temaAtual.categorias[1].nome = this.literals.natureza;
        this.temaAtual.categorias[1].imagem = '../../../assets/ciencias/natureza.png';
        this.temaAtual.categorias[1].jogos[0].imagem = '../../../assets/ciencias/animais.png';
        this.temaAtual.categorias[1].jogos[0].link = '/jogoAnimais';
        this.temaAtual.categorias[1].jogos[1].imagem = '../../../assets/ciencias/seresvivos.png';
        this.temaAtual.categorias[1].jogos[1].link = '/jogoSeresVivos';
      } else {
        this.temaAtual.nome = this.literals.tituloHum;
        this.temaAtual.background = '#C4EEA6';
        this.temaAtual.categorias[0].nome = this.literals.geografia;
        this.temaAtual.categorias[0].imagem = '../../../assets/humanas/globo.png';
        this.temaAtual.categorias[0].jogos[0].imagem = '../../../assets/humanas/planetas.jpg';
        this.temaAtual.categorias[0].jogos[0].link = 'jogoPlanetas';
        this.temaAtual.categorias[0].jogos[1].imagem = '../../../assets/humanas/icon.png';
        this.temaAtual.categorias[0].jogos[1].link = '/jogoVeiculos';
        this.temaAtual.categorias[1].nome = this.literals.historia;
        this.temaAtual.categorias[1].imagem = '../../../assets/humanas/historia.png';
        this.temaAtual.categorias[1].jogos[0].imagem = '../../../assets/humanas/hist.png';
        this.temaAtual.categorias[1].jogos[0].link = 'jogoFolclore';
        this.temaAtual.categorias[1].jogos[1].imagem = '../../../assets/humanas/history.png';
        this.temaAtual.categorias[1].jogos[1].link = 'jogoOndeEstao';
      }
    });
  }

  public redirect(index: string) {
    this.router.navigate([index]);
  }

}
