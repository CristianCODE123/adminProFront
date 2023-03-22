import { Component, ViewChild, ElementRef,OnInit , HostListener } from '@angular/core'
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
    
    if (currentTime > 0 && parseInt(currentTime)  % 5 === 0  ) {
      const formData = new FormData();
       const socket = io('http://localhost:3000');
      console.log("imagen enviada");
       socket.emit('image', imageData);

    }
    console.log(currentTime,"currentTime")

    // Establece el nombre de archivo y descarga la imagen
    // link.download = 'captura.png';
    // link.click();
  }
  
  @HostListener('window:beforeunload', ['$event'])


   handleBeforeUnload(event:any) {
    event.preventDefault();
    event.returnValue = '';
    // Eliminar la variable del localStorage al cerrar la pestaña o recargar la página
    localStorage.removeItem('currentStream');  
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
 conversationDetect:any;
 
 detectar(){
  console.log("ls", localStorage.getItem('currentStream'))
  console.log(666,this.localStream?.isAudioEnabled())
  console.log(666,this.localStream?.isVideoEnabled())
console.log(666,this.localStream?.hasAudio())
console.log(666, this.localStream?.hasData());
 }
 localStorageCondition:any;
 usernameValue:any;
 async ngOnInit():Promise<void>{
  console.log("localStorage: " + localStorage.getItem('currentStream'))
   await this.ss.getAllStreams();
    console.log("streams:")
    console.log(908,this.ss.listStreams)
 
   
//en la ejecucion antes de iniciar el stream se hace la validacion si es que ya se inicio el stream es distinto a undefined

if(localStorage.getItem('currentStream') == undefined){
  this.ss.finishUser(this.conversationNameFc);

    }
    if(this.localStream != undefined){
  // setInterval(() => {
  //     this.capture();
  //   }, 1000);
  console.log("xd")
    }
  

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
  activeConversations:any;
  // Función para obtener o crear una nueva conversación
   localStream:Stream | undefined;
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
      this.activeConversations = session.getActiveConversations();
      localStorage.setItem('currentStream', JSON.stringify({ conversation: this.conversation }));
      this.localStorageCondition = this.conversation;



      if(this.localStorageCondition != undefined || this.localStorageCondition != ""){


        window.addEventListener('beforeunload', (event) => {
          this.handleBeforeUnload(event);
        });
        

       
      }
      //==========================================================
      // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
      //==========================================================
      //
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
        console.log("remotesCounter",this.remotesCounter)
        stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {}, false);
      }).on('streamRemoved', (stream: any) => {
        console.log("remotesCounter",this.remotesCounter)
        this.remotesCounter -= 1;
        stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
      });

      //==============================
      // 5/ CREATE LOCAL STREAM
      //==============================




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


  getAllStreams(){
    this.ss.getAllStreams();
    console.log("streams:")
    console.log(this.ss.getStreams())
    
  }



  stopStream() { 
    console.log(this.conversation)
      // this.conversation.getStatus();
    // localStream.detachFromElement(this.videoRef.nativeElement);
    this.localStream?.release();

  
    this.conversation.unsubscribeToMedia(this.streamId);
    this.conversation.leave();
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    this.videoRef.nativeElement.pause();
    this.videoRef.nativeElement.rsc = null;
    this.localStream?.removeFromDiv('remote-container', 'remote-media-')
     this.ss.finishUser(this.conversationNameFc)

    console.log(this.activeConversations);
const conversationIds = Object.keys(this.activeConversations); // Obtener todos los identificadores de conversación
const conversations = conversationIds.map(id => this.activeConversations[id]); // Obtener todas las conversaciones a través de sus identificadores
console.log("conversations: en tiempo real")
console.log(conversations); 
console.log("close");

  }

  
}
