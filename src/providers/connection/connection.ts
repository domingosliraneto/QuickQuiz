import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class ConnectionProvider {

  loading: any;

  constructor(public http: Http, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, 
              public toastCtrl: ToastController,
              public storage: Storage) {}

  getRequest(url: string) {
    return this.http.get(url).map(
      res => res.json()
    );
  }

  saveUrl(data: string) {
    this.storage.set('urlApi', data);
  }

  removeUrl() {
    this.storage.remove('urlApi');
  }
  
  async mostrarAviso(mensagem: string): Promise<any> {
    let alert = await this.alertCtrl.create({
      header: "Aviso!",
      subHeader: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarToast(mensagem: string): Promise<any> {
    let toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      message:'Aguarde...',
      spinner: 'crescent'
    });
    return this.loading.present();
  }

  hideLoading(){
    return this.loading.dismiss();
  }
}
