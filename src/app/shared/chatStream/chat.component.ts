import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {io} from 'socket.io-client';

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

  constructor() { }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    this.socket.on('chat message', (msg: string) => {
      this.messages.push(msg);
      this.scrollToBottom();
    });
  }

  sendMessage(): void {
    this.socket.emit('chat message', this.message);
    this.message = '';
  }

  private scrollToBottom(): void {
    const chatListElem = this.chatList?.nativeElement;
    chatListElem.scrollTop = chatListElem?.scrollHeight;
  }
}
