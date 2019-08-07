import * as tslib_1 from "tslib";
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
var ConnectionProvider = /** @class */ (function () {
    function ConnectionProvider(http, loadingCtrl, alertCtrl, toastCtrl, storage) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
    }
    ConnectionProvider.prototype.getRequest = function (url) {
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    ConnectionProvider.prototype.saveUrl = function (data) {
        this.storage.set('urlApi', data);
    };
    ConnectionProvider.prototype.removeUrl = function () {
        this.storage.remove('urlApi');
    };
    ConnectionProvider.prototype.mostrarAviso = function (mensagem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "Aviso!",
                            subHeader: mensagem,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectionProvider.prototype.mostrarToast = function (mensagem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: mensagem,
                            duration: 2000,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConnectionProvider.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            message: 'Aguarde...',
            spinner: 'crescent'
        });
        return this.loading.present();
    };
    ConnectionProvider.prototype.hideLoading = function () {
        return this.loading.dismiss();
    };
    ConnectionProvider = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http,
            LoadingController,
            AlertController,
            ToastController,
            Storage])
    ], ConnectionProvider);
    return ConnectionProvider;
}());
export { ConnectionProvider };
//# sourceMappingURL=connection.js.map