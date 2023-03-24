import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: any;
  message:any;

  constructor() {
   this.socket = io('http://localhost:3000', { transports: ['websocket'] }); 
   // Cambia la URL por la de tu servidor de Socket.io
   }

  
    
      public getAllMesagesFromSession(){
  
          }


   public isConnectedNotification(): Promise<void> {
    return new Promise<void>((resolve) => {
       this.socket.on('connect', () => {
        console.log('Conexión establecida');
      });
      
      this.socket.on('stream-started-server', (data:any) => {
        console.log('Evento "stream-started-server" recibido en el cliente:', data);
        this.message = data.message;
        resolve();
      });
    });
  }
  messages: string[] = [];
  
  public getMesages(){
    this.socket.on('chat message', (msg: string) => {
      this.messages.push(msg);
    });
  }
   public getMessage(){
    return this.message;
   }
   listStreams:any;
   
   getStreams(){
      return this.listStreams;
   }

   i:number = 0;
   public getAllStreams(): Promise<void> {
    return new Promise<void>((resolve) => {
        
        console.log('Conexión establecida');
        this.socket.emit("see-user")

        console.log("fueraxD")
        this.socket.on('getStreams', (data:any) => {
          this.i++;
          console.log("dentro:v"+this.i)
          this.listStreams = data.message;
          console.log(this.listStreams,345)
          resolve();
        });
     
     
    });
  }
  imageUrl:any;
  public getImgUrl(){

    this.socket.on('image-url', (imageUrl: string) => {
      console.log('URL de la imagen recibida'+ imageUrl);
      this.imageUrl = imageUrl;
    });

  }
   public streamStarted(user:any): void {
    // this.socket = io('http://localhost:3000');
    this.socket.emit('stream-started',user);
    
  }
  public finishUser(user: any) {
    console.log("finishing userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:")
    this.socket.emit("destroy-user", user);
  }
   public sendStreamStartedNotification(): void {
    // this.socket = io('http://localhost:3000');
    this.socket.emit('stream-started-other-instance');
    
  }

}
