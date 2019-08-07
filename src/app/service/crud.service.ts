import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  valor: string;
  constructor(public firestore: AngularFirestore) {
  }

  auterarQuestao(record) {
    console.log(record)
    return this.firestore.collection('Questoes/').doc('RzKlt6YQjLZzuqKhUP3J').set(record);
  }

  create_NewStudent(disciplinaNome, studentName, recordID, record) {
    console.log(recordID)
    return this.firestore.collection(disciplinaNome + '_' + studentName + '/').doc(recordID).set(record);
  }

  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }

  update_Student(disciplinaNome, studentName, recordID, record) {
    console.log(disciplinaNome + '_' + studentName + '/' + recordID);
    return this.firestore.doc(disciplinaNome + '_' + studentName + '/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }

  read(val) {
    return this.firestore.collection(val).snapshotChanges();
  }

  redeAll() {
    console.log(this.firestore);
    //return this.firestore.collection.arguments;
  }

}