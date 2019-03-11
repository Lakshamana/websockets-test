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
      .subscribe(message => console.log(message))
  }  

  sendMessage(messageContent: string) {
    this.inputTextValue = ''
    let message: WebMessage = {
      content: messageContent,
      type: "SEND"
    }
    this.messages.push(message)
    this.socketService.sendMessage(message)
  }

  getMessages(): WebMessage[] {
    return this.messages
  }

  removeMessage(message: WebMessage) {
    this.messages.splice(this.messages.indexOf(message), 1)
    this.socketService.sendMessage({
      content: message.content,
      type: "DELETE"
    })
  }
}