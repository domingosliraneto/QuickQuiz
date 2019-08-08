import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { whenRendered } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  valor: string;
  constructor(public firestore: AngularFirestore) {
  }

  auterarQuestao(record) {
    return this.firestore.collection('Questoes/').doc('RzKlt6YQjLZzuqKhUP3J').set(record);
  }

  create_NewStudent(disciplinaNome, studentName, recordID, record) {
    return this.firestore.collection(disciplinaNome + '/').doc(studentName + '_' + recordID).set(record);
  }

  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }

  update_Student(disciplinaNome, studentName, recordID, record) {
    return this.firestore.doc(disciplinaNome + '_' + studentName + '/' + recordID).update(record);
  }

  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }

  read(val) {
    return this.firestore.collection(val).snapshotChanges();
  }

  redeAll(val) {
    return this.firestore.collection(val).snapshotChanges();
  }

}