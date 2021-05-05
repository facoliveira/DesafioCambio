import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Moeda } from './../../entities/entitie';

@Component({
  selector: 'app-moeda',
  templateUrl: './moeda.component.html',
  styleUrls: ['./moeda.component.css']
})
export class MoedaComponent implements OnInit {
  moedas: Moeda[];
  erro = "";

  constructor(public http: HttpClient) {
    http.get(environment.apiUrl + "Moeda").subscribe(result => {
      this.moedas = result["itens"];
    }, error => this.erro = error);
  }

  ngOnInit(): void {
  }

  excluir(moedaId: string) {
    this.http.delete(environment.apiUrl + "Moeda/" + moedaId).subscribe(result => {
      location.reload();
    }, error => {
      this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
      console.log(error);
    });
  }

}
