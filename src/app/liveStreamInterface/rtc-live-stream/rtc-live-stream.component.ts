import { Component, ViewChild, ElementRef,OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LiveStreamService } from 'src/app/servicios/livestream/live-stream.service';
import { Conversation, UserAgent, Session, Stream } from '@apirtc/apirtc'
import { SocketService } from 'src/app/servicios/sockets/socket.service';
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

  conversationFormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
     private route: ActivatedRoute,  
     private router: Router,
     private streamService: LiveStreamService, 
     private ss: SocketService
     ) {
  }
  // Función para obtener el controlador de formulario para el nombre de la conversación
 message:any
 
  ngOnInit():void{
   

  }
 
 
  see(){
  console.log(this.publishedStreams)
  this.streamService.stream.emit("stream")
 }
  get conversationNameFc():string {
    return this.route.snapshot.paramMap.get('user')+"";

  }
 
  user:any;
  startStream(){
    this.user = this.route.snapshot.paramMap.get('user');
    console.log(this.user)

    const stopButton = document.getElementById('stopButton');
    setTimeout(() => {
      this.stop.nativeElement.style.display = 'block';

    }, 3000);

  }

  conversation: any;
  remotesCounter = 0;
  // Función para obtener o crear una nueva conversación

  getOrcreateConversation() {
    var localStream:any = null;
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
      conversation.on('streamListChanged', (streamInfo: any) => {
        console.log("streamListChanged :", streamInfo);
        if (streamInfo.listEventType === 'added') {
          if (streamInfo.isRemote === true) {
            conversation.subscribeToMedia(streamInfo.streamId)
              .then((stream: Stream) => {
                console.log('subscribeToMedia success', stream);
              }).catch((err) => {
                console.error('subscribeToMedia error', err);
              });
          }
        }
      });
            // Se agrega otro controlador de eventos para cuando se agregue o se elimine un flujo de medios en la conversación

      //=====================================================
      // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
      //=====================================================
      conversation.on('streamAdded', (stream: Stream) => {
        this.remotesCounter += 1;
        stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {}, false);
      }).on('streamRemoved', (stream: any) => {
        this.remotesCounter -= 1;
        stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
      });

      //==============================
      // 5/ CREATE LOCAL STREAM
      //==============================
      userAgent.createStream({
        constraints: {
          audio: true,
          video: true
        }
      })
        .then((stream: Stream) => {
          this.ss.streamStarted();


          console.log('createStream :', stream);
         // this.streamService.stream = stream;

          // Save local stream
          localStream = stream;

          // Display stream
          localStream.attachToElement(this.videoRef.nativeElement);
          //==============================
          // 6/ JOIN CONVERSATION
          //==============================
          conversation.join()
            .then(() => {
              //==============================
              // 7/ PUBLISH LOCAL STREAM
              //==============================
              conversation.publish(localStream).then((stream: Stream) => {
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
    
  }

  
}
