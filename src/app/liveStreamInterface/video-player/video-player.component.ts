import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Hls from 'hls.js';
import * as CryptoJS from 'crypto-js';
import {io} from 'socket.io-client';

import { HttpClient } from '@angular/common/http';
import { LiveStreamService } from 'src/app/servicios/livestream/live-stream.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
} )
export class VideoPlayerComponent implements OnInit{
  
  private hls = new Hls();
  private user:string | null = 'HOME'; //user que se pasa por la url como parametro
  private playing: boolean = false;
  private context: AudioContext = new AudioContext();

  @ViewChild('video',{static:true}) private readonly video: ElementRef<HTMLVideoElement> | any;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private ls: LiveStreamService,
    private router: Router
    ){

  }


  cacheEncript(){
   let random = Math.floor(Math.random() * 10000000);
   const numberToEncrypt = random;
   const stringToEncrypt = numberToEncrypt.toString();
   const hash = CryptoJS.SHA256(stringToEncrypt);
   const encryptedString = hash.toString();
   return encryptedString;
  }

  message: string | undefined;

  // Declara una propiedad para la conexión WebSocket
  ws: WebSocket | undefined;

 

  ngOnInit(): void {

    
    this.user = this.route.snapshot.paramMap.get('user') || 'HOME';
    console.log(123,this.cacheEncript());
    this.loadClick(`http://localhost:9000/live/${this.user}/index.m3u8?cache=${this.cacheEncript()}`)
    const video = this.video.nativeElement;
    video.muted = true;   
    //this.ls.getResponseFromNode();
    const socket = io('http://localhost:3000');
    

    socket.on('transmitiendo', (data: any) => {

      setTimeout(() => {
        // Aquí va el código que se ejecutará después de 15 segundos
        console.log(data.message); // Mostrar el mensaje en la consola
        this.user = this.route.snapshot.paramMap.get('user') || 'HOME';
        console.log(123,this.cacheEncript());
        this.load(`http://localhost:9000/live/${this.user}/index.m3u8?cache=${this.cacheEncript()}`)
        const video = this.video.nativeElement;
        video.muted = true;   
      }, 15000);
      

    });

      socket.on('Destransmitiendo', (data: any) => {
     
        this.video.nativeElement.src = "";

        // Reproducir el video
        this.video.nativeElement.play();
      
    });



    this.video.nativeElement.addEventListener('loadedmetadata', () => {
      if (this.video.nativeElement.readyState >= 2) {
        console.log('El video está listo para reproducirse');
      } else {
        console.log('El video se está cargando');
      }
    });

  }
  loadInit():void{

  }

  public loadClick(currentVideo: string): void {
    if (Hls.isSupported()) {
      this.video.nativeElement.addEventListener("click",()=>{
        const context = new AudioContext();
          this.loadVideoWithHLS(currentVideo, context);
      })

    } else {
      console.log('HLS is not supported in your browser');
    }
  }


  public load(currentVideo: string): void {
    if (Hls.isSupported()) {
      const context = new AudioContext();
        this.loadVideoWithHLS(currentVideo, context);
    } else {
      console.log('HLS is not supported in your browser');
    }
  }

  
// el problema nuevo es que cuando reiniciamos la pagina, el audio bloquea el video
// entonces cuando bloqueamos el audio el video se reproduce deforma normal
private loadVideoWithHLS(currentVideo: string, context: AudioContext) {
  const timestamp = new Date().getTime();
  const urlWithTimestamp = `${currentVideo}?t=${timestamp}`;
  

    this.hls.loadSource(urlWithTimestamp);
    this.hls.attachMedia(this.video.nativeElement);
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      context.resume();
    });
  
    this.hls.startLoad();
  }
}

