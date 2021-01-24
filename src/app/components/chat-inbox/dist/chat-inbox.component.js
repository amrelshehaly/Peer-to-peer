"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatInboxComponent = void 0;
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var SOCKET_ENDPOINT = 'http://localhost:3000/';
var ChatInboxComponent = /** @class */ (function () {
    function ChatInboxComponent() {
    }
    ChatInboxComponent.prototype.ngOnInit = function () {
        this.setupSocketConnection();
    };
    ChatInboxComponent.prototype.setupSocketConnection = function () {
        this.socket = io.io(SOCKET_ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        this.socket.on('message-broadcast', function (data) {
            if (data) {
                var element = document.createElement('li');
                element.innerHTML = data;
                element.style.background = 'white';
                element.style.padding = '15px 30px';
                element.style.margin = '10px';
                document.getElementById('message-list').appendChild(element);
            }
        });
    };
    ChatInboxComponent.prototype.SendMessage = function () {
        this.socket.emit('FEmessage', this.message);
        var element = document.createElement('li');
        element.innerHTML = this.message;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        element.style.textAlign = 'right';
        document.getElementById('message-list').appendChild(element);
        this.message = '';
    };
    ChatInboxComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-inbox',
            templateUrl: './chat-inbox.component.html',
            styleUrls: ['./chat-inbox.component.css']
        })
    ], ChatInboxComponent);
    return ChatInboxComponent;
}());
exports.ChatInboxComponent = ChatInboxComponent;
