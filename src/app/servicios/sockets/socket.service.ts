import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  socket: any;
  message:any;
  constructor() {
    this.socket = io('http://localhost:3000'); // Cambia la URL por la de tu servidor de Socket.io
   }

  

   public isConnectedNotification(): Promise<void> {
    return new Promise<void>((resolve) => {
      const socket = io('http://localhost:3000', { transports: ['websocket'] });
      socket.on('connect', () => {
        console.log('Conexión establecida');
      });
      
      socket.on('stream-started-server', (data) => {
        console.log('Evento "stream-started-server" recibido en el cliente:', data);
        this.message = data.message;
        resolve();
      });
    });
  }

   public getMessage(){
    return this.message;
   }
   public streamStarted(user:any): void {
    console.log("all migthy")
    const socket = io('http://localhost:3000');
    socket.emit('stream-started',user);
  }

   public sendStreamStartedNotification(): void {
    const socket = io('http://localhost:3000');
    socket.emit('stream-started-other-instance');
  }

}
