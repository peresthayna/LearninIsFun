import { ReacoesLeoComponent } from './shared/reacoes-leo/reacoes-leo.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './main/pagina-inicial/pagina-inicial.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { EscolherJogoComponent } from './main/escolher-jogo/escolher-jogo.component';
import { CorpoHumanoComponent } from './ciencias/corpo-humano/corpo-humano.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReloadComponent } from './shared/reload/reload.component';
import { AcessoriosComponent } from './ciencias/acessorios/acessorios.component';
import { QuantosTemosComponent } from './matematica/quantos-temos/quantos-temos.component';
import { CoracoesComponent } from './matematica/coracoes/coracoes.component';
import { IniciaisComponent } from './linguagens/iniciais/iniciais.component';
import { QuantidadeFormasComponent } from './matematica/quantidade-formas/quantidade-formas.component';
import { AlfabetoComponent } from './linguagens/alfabeto/alfabeto.component';
import { SelecionarUsuarioComponent } from './usuario/selecionar-usuario/selecionar-usuario.component';
import { CriarUsuarioComponent } from './usuario/criar-usuario/criar-usuario.component';
import { RankingComponent } from './usuario/ranking/ranking.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './shared/perfil/perfil.component';
import { EncaixarFormasComponent } from './matematica/encaixar-formas/encaixar-formas.component';
import { CoresFrutasComponent } from './linguagens/cores-frutas/cores-frutas.component';
import { AnimaisComponent } from './ciencias/animais/animais.component';
import { VeiculosComponent } from './humanas/veiculos/veiculos.component';
import { PlanetasComponent } from './humanas/planetas/planetas.component';
import { CoresComponent } from './linguagens/cores/cores.component';
import { SeresVivosComponent } from './ciencias/seres-vivos/seres-vivos.component';
import { FolcloreComponent } from './humanas/folclore/folclore.component';
import { OndeEstaoComponent } from './humanas/onde-estao/onde-estao.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotaoVoltarComponent } from './shared/botao-voltar/botao-voltar.component';
import { EscolherTemaComponent } from './main/escolher-tema/escolher-tema.component';
import { BotaoLogoutComponent } from './shared/botao-logout/botao-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    NavbarComponent,
    EscolherJogoComponent,
    CorpoHumanoComponent,
    ReacoesLeoComponent,
    ReloadComponent,
    AcessoriosComponent,
    QuantosTemosComponent,
    CoracoesComponent,
    IniciaisComponent,
    QuantidadeFormasComponent,
    AlfabetoComponent,
    SelecionarUsuarioComponent,
    CriarUsuarioComponent,
    RankingComponent,
    PerfilComponent,
    EncaixarFormasComponent,
    CoresFrutasComponent,
    AnimaisComponent,
    VeiculosComponent,
    PlanetasComponent,
    CoresComponent,
    SeresVivosComponent,
    FolcloreComponent,
    OndeEstaoComponent,
    BotaoVoltarComponent,
    EscolherTemaComponent,
    BotaoLogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
