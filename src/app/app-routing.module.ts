import { EscolherTemaComponent } from './main/escolher-tema/escolher-tema.component';
import { OndeEstaoComponent } from './humanas/onde-estao/onde-estao.component';
import { FolcloreComponent } from './humanas/folclore/folclore.component';
import { SeresVivosComponent } from './ciencias/seres-vivos/seres-vivos.component';
import { CoresComponent } from './linguagens/cores/cores.component';
import { PlanetasComponent } from './humanas/planetas/planetas.component';
import { VeiculosComponent } from './humanas/veiculos/veiculos.component';
import { AnimaisComponent } from './ciencias/animais/animais.component';
import { CoresFrutasComponent } from './linguagens/cores-frutas/cores-frutas.component';
import { EncaixarFormasComponent } from './matematica/encaixar-formas/encaixar-formas.component';
import { SelecionarUsuarioComponent } from './usuario/selecionar-usuario/selecionar-usuario.component';
import { CriarUsuarioComponent } from './usuario/criar-usuario/criar-usuario.component';
import { RankingComponent } from './usuario/ranking/ranking.component';
import { AlfabetoComponent } from './linguagens/alfabeto/alfabeto.component';
import { QuantidadeFormasComponent } from './matematica/quantidade-formas/quantidade-formas.component';
import { IniciaisComponent } from './linguagens/iniciais/iniciais.component';
import { CoracoesComponent } from './matematica/coracoes/coracoes.component';
import { QuantosTemosComponent } from './matematica/quantos-temos/quantos-temos.component';
import { AcessoriosComponent } from './ciencias/acessorios/acessorios.component';
import { CorpoHumanoComponent } from './ciencias/corpo-humano/corpo-humano.component';
import { EscolherJogoComponent } from './main/escolher-jogo/escolher-jogo.component';
import { PaginaInicialComponent } from './main/pagina-inicial/pagina-inicial.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'escolherJogo/:id', component: EscolherJogoComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'criarJogador', component: CriarUsuarioComponent },
  { path: 'selecionarJogador', component: SelecionarUsuarioComponent },
  { path: 'escolherTema', component: EscolherTemaComponent },
  //Linguagens
  { path: 'jogoIniciais', component: IniciaisComponent },
  { path: 'jogoAlfabeto', component: AlfabetoComponent },
  { path: 'jogoCoresFrutas', component: CoresFrutasComponent },
  { path: 'jogoCores', component: CoresComponent },
  //Matemática
  { path: 'jogoQuantidades', component: QuantosTemosComponent },
  { path: 'jogoCoracoes', component: CoracoesComponent },
  { path: 'jogoQuantidadeFormas', component: QuantidadeFormasComponent },
  { path: 'jogoEncaixarFormas', component: EncaixarFormasComponent },
  //Ciências
  { path: 'jogoCorpoHumano', component: CorpoHumanoComponent },
  { path: 'jogoAcessorios', component: AcessoriosComponent },
  { path: 'jogoAnimais', component: AnimaisComponent },
  { path: 'jogoSeresVivos', component: SeresVivosComponent },
  //Humanas
  { path: 'jogoPlanetas', component: PlanetasComponent },
  { path: 'jogoVeiculos', component: VeiculosComponent },
  { path: 'jogoFolclore', component: FolcloreComponent },
  { path: 'jogoOndeEstao', component: OndeEstaoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
