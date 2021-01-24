"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VideoChatComponent = void 0;
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var SOCKET_ENDPOINT = 'http://localhost:3000/';
var VideoChatComponent = /** @class */ (function () {
    function VideoChatComponent() {
    }
    VideoChatComponent.prototype.ngOnInit = function () {
        this.setupSocketConnection();
    };
    VideoChatComponent.prototype.setupSocketConnection = function () {
        this.socket = io.io(SOCKET_ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        this.socket.on('user-connected', function (userId) {
            console.log('User connected' + userId);
        });
    };
    VideoChatComponent.prototype.SendMessage = function () {
        this.socket.emit('join-room', 'roomid will be there soon', 10);
    };
    VideoChatComponent = __decorate([
        core_1.Component({
            selector: 'app-video-chat',
            templateUrl: './video-chat.component.html',
            styleUrls: ['./video-chat.component.css']
        })
    ], VideoChatComponent);
    return VideoChatComponent;
}());
exports.VideoChatComponent = VideoChatComponent;
