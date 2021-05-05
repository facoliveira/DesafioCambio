import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-segmento-cadastrar',
  templateUrl: './segmento-cadastrar.component.html',
  styleUrls: ['./segmento-cadastrar.component.css']
})
export class SegmentoCadastrarComponent implements OnInit {
  mensagem = "";
  erro = "";

  cadastrarForm = this.fb.group({
    nome: ['', Validators.required],
    taxa: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.cadastrarForm.valid) {
      this.erro = "";
      this.cadastrarForm.controls["taxa"].setValue(this.cadastrarForm.controls["taxa"].value / 100);
      this.http.post(environment.apiUrl + "Segmento", this.cadastrarForm.value).subscribe(result => {
        this.cadastrarForm.controls["taxa"].setValue(this.cadastrarForm.controls["taxa"].value * 100);
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
