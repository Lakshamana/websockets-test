import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SocketService } from './message/socket.service';
import { WebMessage } from './message/webmessage.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  messages: WebMessage[] = []
  inputTextValue: string = ''
  length: number = 0
  socketConnected = false
  label:string = 'Connect'

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.connected
      .subscribe(value => {
        this.socketConnected = value;
        if(value) {
          // this.socketService.initSocket();
          this.socketService.inMessages
            .subscribe(messages => {
              this.messages = messages
              this.length = messages.length
            });
        }
      })
  }

  toggleConnected() {
    if(this.socketConnected) {
      this.label = 'Connect'
      this.socketConnected = false
      this.socketService.disconnectSocket()
    } else {
      this.label = 'Disconnect' 
      this.socketConnected = true
      this.socketService.getAllMessages()
      .subscribe(messages => {
        this.messages = messages
        this.length = messages.length
      })
      this.socketService.initSocket()
    }
  }

  sendMessage(messageContent: string) {
    this.inputTextValue = ''
    this.socketService.sendMessage({
      id: 0,
      content: messageContent,
      type: "SEND"
    })
  }

  removeMessage(message: WebMessage) {
    this.socketService.sendMessage({
      id: message.id,
      content: message.content,
      type: "DELETE"
    })
  }
}