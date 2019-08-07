import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConnectionProvider } from '../../providers/connection/connection';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(navCtrl, storage, connection) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.connection = connection;
        this.modes = [{ id: 1, mode: 'Burst', }, { id: 2, mode: 'Normal', },
            { id: 3, mode: 'Modulation', }, { id: 4, mode: 'SD1', }, { id: 5, mode: 'SD2', },
            { id: 6, mode: 'March', }];
        this.channels = [{ id: 1, channel: 1, }, { id: 2, channel: 2, }, { id: 3, channel: 3, },
            { id: 4, channel: 4, }, { id: 5, channel: 5, }, { id: 6, channel: 6, }, { id: 7, channel: 7, },
            { id: 8, channel: 8, }];
    }
    Tab2Page.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('urlApi').then(function (res) {
            if (res != null) {
                _this.private_url = res;
            }
            else {
                _this.private_url = 'vazio';
            }
        });
    };
    Tab2Page.prototype.submitUrl = function () {
        var _this = this;
        this.connection.saveUrl('http://' + this.url);
        this.storage.get('urlApi').then(function (res) {
            _this.connection.mostrarAviso('Endereço ' + _this.url + ' salvo.');
            _this.private_url = res;
        });
    };
    Tab2Page.prototype.deleteUrl = function () {
        var _this = this;
        this.storage.remove('urlApi')
            .then(function () {
            _this.connection.mostrarAviso('Endereço apagado. Insira um novo para continuar.');
            _this.private_url = '';
        });
    };
    Tab2Page.prototype.selectModels = function (model) {
        console.log(model);
    };
    Tab2Page.prototype.selectCannel = function (channel) {
        console.log(channel);
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Storage,
            ConnectionProvider])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map