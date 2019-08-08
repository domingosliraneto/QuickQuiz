import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../service/crud.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  questaoFinal: any;
  questoesFilter: Array<{ usuarioResposta: any, Questao: any, Resposta: any }>;
  randonQuestao: any;
  habilitada: any;
  numeroQuestao: any;
  ativo: any = [{ val: "Sim" }, { val: "Não" }];
  hash: any;
  hashFire: any;
  val: boolean = false;
  constructor(public firestore: AngularFirestore, public crudService: CrudService) {
    this.questoesFilter = [];
  }
  ngOnInit() {
    this.crudService.read('Hash').subscribe(data => {
      this.hashFire = data.map(e => {
        return {
          val: e.payload.doc.data()['val'],
        };
      })
    });
  }
  auterarQuestao() {
    let record = {};
    if (this.habilitada == "Sim")
      record['habilitada'] = Boolean(1);
    else
      record['habilitada'] = Boolean(0);

    record['numeroQuestao'] = this.numeroQuestao;
    this.crudService.auterarQuestao(record);
    if (this.habilitada == "Não") {
      this.questoesFilter = [];
      this.crudService.redeAll('funProg20192').subscribe(data => {
        this.randonQuestao = data.map(e => {
          return {
            usuarioResposta: e.payload.doc.id,
            Questao: e.payload.doc.data()['Questao'],
            Resposta: e.payload.doc.data()['Resposta']
          };
        })
        this.randonQuestao.forEach(element => {
          console.log('Primeiro: ' + element.Questao + ' ' + this.numeroQuestao)
          if (element.Questao == this.numeroQuestao) {
            console.log('Segundo: ' + element.Questao + element.usuarioResposta)
            this.questoesFilter.push({
              usuarioResposta: element.usuarioResposta,
              Questao: element.Questao,
              Resposta: element.Resposta
            });
          }
        });
      });
    }
  }
  randResposta() {
    var rand = this.questoesFilter[Math.random() * this.questoesFilter.length >> 0];
    this.questaoFinal = rand.Resposta;
    console.log('Resposta: ' + this.questaoFinal);
  }
  validator() {
    if (this.hash == this.hashFire[0].val) {
      this.val = true;
    } else {
      this.val = false;
    }
  }
}