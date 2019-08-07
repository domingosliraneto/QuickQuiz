import { Component, ViewChild } from '@angular/core';
import { CrudService } from './../service/crud.service';
import { crudSqlLite, Item } from './../service/crud.sqlLite';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  compararQuestao: any;
  questaoHabilitada: any;
  numeroQuestao: string;
  questoes: any;
  data: any;
  disciplinas: any;
  selectDisciplina: any;
  studentName: string;
  resposta: string;
  items: any;
  newItem: Item = <Item>{}
  idQuestao: any;

  @ViewChild('mylist') mylist: IonList;

  constructor(public firestore: AngularFirestore, public crudService: CrudService,
    public crudSqlLite: crudSqlLite, private storage: Storage,
    private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
    this.crudService.read('Disciplinas').subscribe(data => {
      this.disciplinas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Nome: e.payload.doc.data()['Nome'],
          Ativa: e.payload.doc.data()['Ativa'],
        };
      })
    });

    this.crudService.read('Questoes').subscribe(data => {
      this.questoes = data.map(e => {
        return {
          habilitadaNome: e.payload.doc.data()['habilitada'],
          numeroQuestao: e.payload.doc.data()['numeroQuestao'],
        };
      })
      this.questaoHabilitada = this.questoes[0].habilitadaNome;
      this.numeroQuestao = <string>this.questoes[0].numeroQuestao;
    });
  }

  addItem() {
    this.newItem.id = Date.now();
    this.crudSqlLite.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Item added!')
      this.loadItems();
    });
  }

  CreateRecord() {
    let record = {};
    record['Resposta'] = this.resposta;
    record['Questao'] = this.numeroQuestao;
    if (this.selectDisciplina != null && this.studentName != null && record != null) {
      this.addItem();
      this.crudService.create_NewStudent(this.selectDisciplina, this.studentName,
        String(this.numeroQuestao), record)
        .then(resp => {
          this.resposta = "";
          this.selectDisciplina = null;
          console.log(resp);
        }).catch(error => {
          console.log(error);
        });
    }
    else {
      console.log(this.items[0].disciplina + ' : ' + this.items[0].nome, record)
      this.crudService.create_NewStudent(this.items[0].disciplina, this.items[0].nome,
        String(this.numeroQuestao), record)
        .then(resp => {
          this.resposta = "";
          console.log(resp);
        }).catch(error => {
          console.log(error);
        });
    }
  }

  onChange($event) {
    //console.log($event.target.value);
    this.selectDisciplina = $event.target.value;
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  loadItems() {
    this.crudSqlLite.getItems().then(items => {
      this.items = items;
    });
  }
}
