import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Segmento } from './../../entities/entitie';

@Component({
  selector: 'app-segmento',
  templateUrl: './segmento.component.html',
  styleUrls: ['./segmento.component.css']
})
export class segmentoComponent implements OnInit {
  segmentos: Segmento[];
  erro = "";

  constructor(public http: HttpClient) {
    http.get(environment.apiUrl + "Segmento").subscribe(result => {
      this.segmentos = result["itens"];
    }, error => this.erro = error);
  }

  ngOnInit(): void {
  }

  excluir(moedaId: string) {
    this.http.delete(environment.apiUrl + "Segmento/" + moedaId).subscribe(result => {
      location.reload();
    }, error => {
      this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
      console.log(error);
    });
  }

}
