import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CotacaoComponent } from './cotacao/cotacao.component';
import { MoedaComponent } from './moeda/moeda.component';
import { segmentoComponent } from './segmento/segmento.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MoedaEditarComponent } from './moeda-editar/moeda-editar.component';
import { MoedaCadastrarComponent } from './moeda-cadastrar/moeda-cadastrar.component';
import { SegmentoCadastrarComponent } from './segmento-cadastrar/segmento-cadastrar.component';
import { SegmentoEditarComponent } from './segmento-editar/segmento-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    CotacaoComponent,
    MoedaComponent,
    segmentoComponent,
    NavegacaoComponent,
    MoedaEditarComponent,
    MoedaCadastrarComponent,
    SegmentoCadastrarComponent,
    SegmentoEditarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/cotacao', pathMatch: 'full' },
      { path: 'cotacao', component: CotacaoComponent },
      { path: 'moedas', component: MoedaComponent },
      { path: 'moedas/cadastrar', component: MoedaCadastrarComponent },
      { path: 'moedas/editar/:id', component: MoedaEditarComponent },
      { path: 'segmentos', component: segmentoComponent},
      { path: 'segmentos/cadastrar', component: SegmentoCadastrarComponent },
      { path: 'segmentos/editar/:id', component: SegmentoEditarComponent },
    ]),
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
