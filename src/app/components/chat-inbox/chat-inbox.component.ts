import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as io from 'socket.io-client'
import { environment } from '../../../environments/environment'

const SOCKET_ENDPOINT = environment.UrlAPI;

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket;
  message:string
  list;
  // @ViewChild('one',{ static: false }) d1:ElementRef;

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    this.setupSocketConnection();  
  }

  ngAfterViewInit(){

    this.list = this.elementRef.nativeElement.querySelector('.one');
    

  }
  

  setupSocketConnection(){
    this.socket = io.io(SOCKET_ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
      const container = document.createElement('div')
      container.style.cssText = "border: 2px solid #dedede;border-radius: 5px;padding: 10px;margin: 10px 0;"
      const image_left = document.createElement('img')
      image_left.setAttribute('src', 'assets/img/faces/clem-onojeghuo-3.jpg')
      image_left.style.cssText = "float: left;margin-right:20px;width:100%;max-width:60px;border-radius:50%"
      container.appendChild(image_left)
      const textPara = document.createElement('p')
      textPara.innerHTML = data
      textPara.style.cssText = "display: flex;margin-block-start: 1em;margin-block-end: 1em;"
      container.appendChild(textPara)
      const time = document.createElement('span')
      const date = new Date();
      const currentTime = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
      time.innerHTML = currentTime
      time.style.cssText = " float: right;color: #aaa;margin-top:-15px"
      container.appendChild(time);
      document.getElementById('one').appendChild(container)
       }
     });
  }

  SendMessage(){

    if(this.message){
      this.socket.emit('FEmessage',this.message)

      const container = document.createElement('div')
      container.style.cssText = "border: 2px solid #dedede;border-radius: 5px;padding: 10px;margin: 10px 0;"
      const image_right = document.createElement('img')
      image_right.setAttribute('src', 'assets/img/faces/clem-onojeghuo-3.jpg')
      image_right.style.cssText = "float: right;margin-left: 20px;margin-right:0;width:100%;max-width:60px;border-radius:50%"
      container.appendChild(image_right)
      const textPara = document.createElement('p')
      textPara.innerHTML = this.message
      textPara.style.cssText = "display: flex;margin-block-start: 1em;margin-block-end: 1em;"
      container.appendChild(textPara)
      const time = document.createElement('span')
      const date = new Date();
      const currentTime = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
      time.innerHTML = currentTime
      time.style.cssText = " float: left;color: #aaa;margin-top:-15px"
      container.appendChild(time);
      document.getElementById('one').appendChild(container)
      this.message =''
    }
  }

}
