import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moeda-editar',
  templateUrl: './moeda-editar.component.html',
  styleUrls: ['./moeda-editar.component.css']
})
export class MoedaEditarComponent implements OnInit {
  mensagem = "";
  erro = "";
  id = "";

  editarForm = this.fb.group({
    nome: ['', Validators.required],
    codigo: ['', Validators.required],
    id: [''],
  });

  constructor(private fb: FormBuilder, public http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.http.get(environment.apiUrl + "Moeda/" + this.id ).subscribe(result => {
        this.editarForm.controls["nome"].setValue(result["item"]["nome"]);
        this.editarForm.controls["codigo"].setValue(result["item"]["codigo"]);
      }, error => {
        this.erro = error.error["mensagem"] ? error.error["mensagem"] : error.message ;
        console.log(error);
      });
    });
  }

  onSubmit(): void {
    if(this.editarForm.valid) {
      this.erro = "";
      this.editarForm.controls["id"].setValue(this.id);
      this.http.put(environment.apiUrl + "Moeda", this.editarForm.value).subscribe(result => {
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
