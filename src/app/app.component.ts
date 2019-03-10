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
  
  constructor(private socketService: SocketService){}

  ngOnInit(): void {
    this.socketService.initSocket()
      .subscribe(message => this.messages.push(message))
  }  

  sendMessage(content: string) {
    
  }
}