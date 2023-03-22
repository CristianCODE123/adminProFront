import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {io} from 'socket.io-client';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild("chatList")
  chatList!: ElementRef;


  socket: any;
  message: string | undefined;
  messages: string[] = [];

  @ViewChild("myTextarea")
  myTextarea!: ElementRef;

  constructor(private us:UserService) { }
  usrName:any;
  
  messageData:any = {};
  getMsg() {
    const textareaValue = this.myTextarea.nativeElement.value;
    const usuario  = this.us.getCurrentUserName().username;
    const date = this.getTime();
    this.messageData = 
    {
      "mensaje":  textareaValue,
      "usuario": usuario,
      "created_at": date

    }
    return this.messageData;
  }

  tiempo:any;

  getTime(){
    let dateTime = new Date()
    let timestamp = dateTime.getTime()
    console.log(timestamp)
    return timestamp
  }
  ngOnInit(): void {
    this.tiempo = this.getTime();
    this.usrName = this.us.getCurrentUserName().username;
    this.socket = io('http://localhost:3000');
    this.socket.on('chat message', (msg: string) => {
      this.messages.push(msg);
      this.scrollToBottom();
    });

  }

  sendMessage(): void {
    this.socket.emit('chat message', this.getMsg());
    this.myTextarea.nativeElement.value = "";  

    

    this.scrollToBottom();
  
  }

  private scrollToBottom(): void {
    this.chatList.nativeElement.scrollTop = parseInt(this.chatList.nativeElement.scrollHeight); // Set th
    console.log("xd12312321",this.chatList.nativeElement.scrollHeight)
  }
}
