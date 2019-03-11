import { BASEURL } from '../app.api';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebMessage } from './webmessage.model'
import { of, Observable } from 'rxjs';
import { Http } from '@angular/http';
import { ErrorHandler } from '../app.error-handler';

@Injectable()
export class SocketService {
    
    private stompClient: Stomp.Client
    constructor() {}

    initSocket() {
        let ws = new SockJS(`${BASEURL}/ws`)
        let incomingMessages: WebMessage[] = []
        this.stompClient = Stomp.over(ws)
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/chat', messages => {
                let parsedMessages:any[] = JSON.parse(messages.body)
                parsedMessages.forEach(m => {
                    incomingMessages.push(m)
                })
            })
        })
        return of(incomingMessages)
    }

    sendMessage(message: WebMessage) {
        this.stompClient.send("/app/send/message", {}, JSON.stringify(message))
    }
}