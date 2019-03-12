import { Component, OnInit } from '@angular/core';
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
  inputTextValue: string 

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.initSocket()
    this.socketService.inMessages
      .subscribe(messages => {
        this.messages = messages
        console.log('MESSAGES:', messages)
      })
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