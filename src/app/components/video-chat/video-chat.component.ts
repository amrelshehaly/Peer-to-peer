import {ViewChild ,Component, OnInit, ElementRef } from '@angular/core';
// import * as Peer from 'peerjs';
import * as io from 'socket.io-client'

declare var Peer: any;

const SOCKET_ENDPOINT = 'http://localhost:3000/';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {

  title = 'app';
  @ViewChild('myvideo') myVideo:ElementRef;
  @ViewChild('videoElement') videoElement :ElementRef;
  ownVideo: any;
  peer;
  anotherid;
  mypeerid = "Please wait loading ID";
  visible:boolean = false
  connection:any;

  constructor() {}

  firstRun(){
    this.ownVideo = this.videoElement.nativeElement;
    let video = this.videoElement.nativeElement;
    this.peer = new Peer({
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      pingInterval: 5000,
    });
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    }, 3000);

    this.peer.on('connection',  (conn)=>{
      this.connection = conn;
      conn.on('data', function (data) {
        console.log(data);
      });
    });
    

    var n = <any>navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    this.peer.on('call', function (call) {

      n.getUserMedia({ video: true, audio: true }, function (stream) {
        call.answer(stream);
        call.on('stream', function (remotestream) {
          console.log("answerd");
          console.log(remotestream);
          const mediaStream = new MediaStream(remotestream);
          const videoStream = <HTMLMediaElement>document.getElementById('videoelement')
          videoStream.srcObject = mediaStream;
          // video.src = URL.createObjectURL(remotestream);
          videoStream.play();
        })
      }, function (err) {
        console.log('Failed to get stream', err);
      })
    })

  }

  ngOnInit() {

    document.getElementById('call_btn').style.display = "none"
    
    setTimeout(()=>{
      this.firstRun()
    },1000)
      
    // this.start()
    
  }

  connect() {
    var conn = this.peer.connect(this.anotherid);
    conn.on('open', function () {
      document.getElementById('call_btn').style.display = "block"
      conn.send(`Message from that id`);
    },err =>{
      console.log(err)
    });
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }

  initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    

    browser.mediaDevices.getUserMedia(config).then(stream => {
      const mediaStream = new MediaStream(stream);
      const videoStream = <HTMLMediaElement>document.getElementById('videoelement')
      videoStream.srcObject = mediaStream;
      // this.ownVideo.src = window.URL.createObjectURL(stream);
      videoStream.play();
    });
  }
  videoconnect() {
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;

    var n = <any>navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    n.getUserMedia({ video: true, audio: true }, function (stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function (remotestream) {
        console.log(video);
        const mediaStream = new MediaStream(remotestream);
        const videoStream = <HTMLMediaElement>document.querySelector('#myvideo')
        videoStream.srcObject = mediaStream;
        // video.src = URL.createObjectURL(remotestream);
        var playPromise =  videoStream.play();
        if(playPromise !== undefined){
          playPromise.then(_=>{
            console.log(_)
            // videoStream.pause();
          })
        }
      })
    }, function (err) {
      console.log('Failed to get stream', err);
    })
  }

}
