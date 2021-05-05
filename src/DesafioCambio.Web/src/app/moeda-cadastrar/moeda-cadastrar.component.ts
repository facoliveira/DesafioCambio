import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-moeda-cadastrar',
  templateUrl: './moeda-cadastrar.component.html',
  styleUrls: ['./moeda-cadastrar.component.css']
})
export class MoedaCadastrarComponent implements OnInit {
  mensagem = "";
  erro = "";

  cadastrarForm = this.fb.group({
    nome: ['', Validators.required],
    codigo: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.cadastrarForm.valid) {
      this.erro = "";
      this.http.post(environment.apiUrl + "Moeda", this.cadastrarForm.value).subscribe(result => {
        this.mensagem = result["mensagem"];
      }, error => {
        this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
        console.log(error);
      });
    } else {
      this.erro = "Preencha o formulário corretamente"
    }
  }
}
