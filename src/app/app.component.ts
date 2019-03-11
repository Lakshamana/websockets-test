import { Component, OnInit } from '@angular/core';
import { SocketService } from './message/socket.service';
import { WebMessage } from './message/webmessage.model';

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
      .subscribe(messages => this.messages = messages)
  }  

  sendMessage(messageContent: string) {
    this.inputTextValue = ''
    let message: WebMessage = {
      id: 0,
      content: messageContent,
      type: "SEND"
    }
    this.socketService.sendMessage(message)
  }

  getMessages(): WebMessage[] {
    return this.messages
  }

  removeMessage(message: WebMessage) {
    this.socketService.sendMessage({
      id: message.id,
      content: message.content,
      type: "DELETE"
    })
    this.socketService.sendMessage(message)
  }
}