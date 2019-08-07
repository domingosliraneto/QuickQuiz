import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../service/crud.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  habilitada: any;
  numeroQuestao: any;
  ativo: any = [{ val: "Sim" }, { val: "Não" }];
  hash: any;
  hashFire: any;
  val: boolean = false;
  constructor(public firestore: AngularFirestore, public crudService: CrudService) {
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
    console.log(this.habilitada + this.numeroQuestao);
    let record = {};
    if(this.habilitada == "Sim")
      record['habilitada'] = Boolean(1);
    else
      record['habilitada'] = Boolean(0);
    
    record['numeroQuestao'] = this.numeroQuestao;
    this.crudService.auterarQuestao(record);
  }
  randResposta() {
    this.crudService.redeAll();
  }
  validator() {
    if (this.hash == this.hashFire[0].val) {
      this.val = true;
    } else {
      this.val = false;
    }
  }
}