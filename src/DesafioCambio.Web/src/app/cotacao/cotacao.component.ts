import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Cambio, Moeda, Segmento } from './../../entities/entitie';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.css']
})
export class CotacaoComponent implements OnInit {
  cotacao = 0;
  erro = "";

  moedas: Moeda[];
  segmentos: Segmento[];

  cotacaoForm = this.fb.group({
    moeda: ['', Validators.required],
    segmento: ['', Validators.required],
    quantidade: ['', Validators.required],
  });
  
  constructor(private fb: FormBuilder, public http: HttpClient) {
    http.get(environment.apiUrl + "Moeda").subscribe(result => {
      this.moedas = result["itens"];
    }, error => {
      this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
      console.log(error);
    });
    
    http.get(environment.apiUrl + "Segmento").subscribe(result => {
      this.segmentos = result["itens"];
    }, error => {
      this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.cotacaoForm.valid) {
      this.erro = "";
      const moedaId = this.cotacaoForm.controls["moeda"].value;
      const segmentoId = this.cotacaoForm.controls["segmento"].value;
      const quantidade = this.cotacaoForm.controls["quantidade"].value;
      this.http.get<Cambio>(environment.apiUrl + "Cambio/" + moedaId + "/" + segmentoId + "/" + quantidade).subscribe(result => {
        this.cotacao = result.valor;
      }, error => {
        this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
        console.log(error);
      });
    } else {
      this.erro = "Preencha o formulário corretamente"
    }
  }
}
