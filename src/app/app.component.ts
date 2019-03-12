import { Component, OnInit } from '@angular/core';
import { SocketService } from './message/socket.service';
import { WebMessage } from './message/webmessage.model';
import { WebElementPromise } from 'protractor';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  messages: WebMessage[] = []
  inputTextValue: string  

  constructor(private socketService: SocketService){}

  ngOnInit(): void {
    this.socketService.initSocket()
      .subscribe(console.log)
    this.getMessages()
  }  

  sendMessage(messageContent: string) {
    this.inputTextValue = ''
    this.socketService.sendMessage({
      id: 0,
      content: messageContent,
      type: "SEND"
    })
    this.getMessages()
  }

  getMessages(): WebMessage[] {
    this.socketService.getAllMessages()
      .then(messages => this.messages = messages)
    return this.messages
  }

  removeMessage(message: WebMessage) {
    this.socketService.sendMessage({
      id: message.id,
      content: message.content,
      type: "DELETE"
    })
    this.getMessages()
  }
}