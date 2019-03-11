import { Component, OnInit, Input } from '@angular/core';
import { WebMessage } from './webmessage.model';

@Component({
  selector: 'ws-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  @Input() message: WebMessage

  constructor() { }

  ngOnInit() {
  }

}
