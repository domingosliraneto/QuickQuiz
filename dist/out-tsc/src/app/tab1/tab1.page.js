import * as tslib_1 from "tslib";
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
var Tab1Page = /** @class */ (function () {
    function Tab1Page() {
        this.get();
    }
    Tab1Page.prototype.get = function () {
        var IP = "192.168.4.1";
        var Port = 4000;
        this.bindEvents();
        var socket = new window.Socket();
        socket.open(IP, Port, function () {
            console.log('socket open');
            var dataString = "send testing";
            var data = new Uint8Array(dataString.length);
            for (var i = 0; i < data.length; i++) {
                data[i] = dataString.charCodeAt(i);
            }
            console.log('before write');
            socket.write(data);
            console.log('after write');
            socket.shutdownWrite();
        }, function (errorMessage) {
            // invoked after unsuccessful opening of socket
        });
    };
    Tab1Page.prototype.bindEvents = function () {
        throw new Error("Method not implemented.");
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map