import { Component, ViewChild, ElementRef,OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LiveStreamService } from 'src/app/servicios/livestream/live-stream.service';
import { Conversation, UserAgent, Session, Stream } from '@apirtc/apirtc'
import { SocketService } from 'src/app/servicios/sockets/socket.service';
import { HttpClient } from '@angular/common/http';

import {io} from 'socket.io-client';
import 'jquery-toast-plugin';

@Component({
  selector: 'app-rtc-live-stream',
  templateUrl: './rtc-live-stream.component.html',
  styleUrls: ['./rtc-live-stream.component.css']
})
export class RtcLiveStreamComponent {
  title = 'ApiRTC-angular';
  publishedStreams:any = [];
  @ViewChild("localVideo")
  videoRef!: ElementRef;

  @ViewChild("start")
  start!: ElementRef;

  @ViewChild("stop")
  stop!: ElementRef;


  // Se define un FormGroup para la conversación que contendrá el nombre de la conversación
  capture() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoRef.nativeElement.videoWidth;
    canvas.height = this.videoRef.nativeElement.videoHeight;
     canvas.getContext('2d')!.drawImage(this.videoRef.nativeElement, 0, 0);
    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageData;
    

    const currentTime = this.videoRef.nativeElement.currentTime;
    
    if (currentTime > 0 && parseInt(currentTime)  % 15 === 0  ) {
      const formData = new FormData();
       const socket = io('http://localhost:3000');
      console.log("imagen enviada")
       socket.emit('image', imageData);

    }
    console.log(currentTime)

    // Establece el nombre de archivo y descarga la imagen
    // link.download = 'captura.png';
    // link.click();
  }
  
  conversationFormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
     private route: ActivatedRoute,  
     private router: Router,
     private streamService: LiveStreamService, 
     private ss: SocketService,
     private http: HttpClient
     ) {
  }
  // Función para obtener el controlador de formulario para el nombre de la conversación
 message:any
 
  ngOnInit():void{
   
    // setInterval(() => {
    //   this.capture();
    // }, 1000);

  }
 
 
  see(){
  console.log(this.publishedStreams)
  
 }
  get conversationNameFc():string {
    return this.route.snapshot.paramMap.get('user')+"";

  }
 
  user:any;
  startStream(){
    this.user = this.route.snapshot.paramMap.get('user');
    console.log(this.user)
    this.streamService.stream.emit(this.user)
    const stopButton = document.getElementById('stopButton');
    setTimeout(() => {
      this.stop.nativeElement.style.display = 'block';

    }, 3000);

  }

  conversation: any;
  remotesCounter = 0;
  // Función para obtener o crear una nueva conversación
   localStream:any = null;
  streamId:any;
  getOrcreateConversation() {
    // Se crea una instancia del objeto UserAgent

    //==============================
    // 1/ CREATE USER AGENT
    //==============================
    var userAgent = new UserAgent({
      uri: 'apiKey:myDemoApiKey'
    });
   // 2/ REGISTER
    // Se registra el usuario con el servidor SIP a través del objeto UserAgent
    //==============================
    // 2/ REGISTER
    //==============================
    userAgent.register().then((session: Session) => {

      //==============================
      // 3/ CREATE CONVERSATION
      //==============================

       // Se obtiene o crea una nueva conversación a través del objeto Session
      const conversation: Conversation = session.getConversation(this.conversationNameFc);
      this.conversation = conversation;

      //==========================================================
      // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
      //==========================================================

      this.conversation.on('streamListChanged', (streamInfo: any) => {
        console.log("streamListChanged :", streamInfo);
        if (streamInfo.listEventType === 'added') {
          if (streamInfo.isRemote === true) {
            this.conversation.subscribeToMedia(streamInfo.streamId)
              .then((stream: Stream) => {
                this.streamId = streamInfo.streamId;
                console.log('subscribeToMedia success', stream);
              }).catch((err:any) => {
                console.error('subscribeToMedia error', err);
              });
          }
        }
      });
            // Se agrega otro controlador de eventos para cuando se agregue o se elimine un flujo de medios en la conversación

      //=====================================================
      // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
      //=====================================================
      this.conversation.on('streamAdded', (stream: Stream) => {
        this.remotesCounter += 1;
        stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {}, false);
      }).on('streamRemoved', (stream: any) => {
        this.remotesCounter -= 1;
        stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
      });

      //==============================
      // 5/ CREATE LOCAL STREAM
      //==============================



      if(this.conversationNameFc == this.conversationNameFc){

      }

      userAgent.createStream({
        constraints: {
          audio: true,
          video: false
        }
      })
        .then((stream: Stream) => {
          this.ss.streamStarted(this.conversationNameFc);


          console.log('createStream :', stream);
         // this.streamService.stream = stream;

          // Save local stream
          this.localStream = stream;

          // Display stream
          this.localStream.attachToElement(this.videoRef.nativeElement);
          //==============================
          // 6/ JOIN CONVERSATION
          //==============================
          this.conversation.join()
            .then(() => {
              //==============================
              // 7/ PUBLISH LOCAL STREAM
              //==============================
              this.conversation.publish(this.localStream).then((stream: Stream) => {
                console.log("?xd")  

              }).catch((err: any) => {
                console.error('publish error', err);
              });
            }).catch((err: any) => {
              console.error('Conversation join error', err);
            });
        }).catch((err: any) => {
          console.error('create stream error', err);
        });
    });

    
  }






  stopStream() { 
    console.log(this.conversation)
      this.conversation.getStatus();
    // const localStream = this.conversation.getLocalStreams()[0];
    // this.conversation.unpublish(localStream);
    // localStream.detachFromElement(this.videoRef.nativeElement);
    // localStream.stop();
    this.localStream.release();
    this.conversation.unsubscribeToMedia(this.streamId);
    // this.conversation.leave();
  }

  
}
