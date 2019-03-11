import { BASEURL } from '../app.api';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebMessage } from './webmessage.model'
import { of } from 'rxjs';

@Injectable()
export class SocketService {
    
    private stompClient: Stomp.Client
    constructor(){}

    initSocket() {
        let ws = new SockJS(`${BASEURL}/ws`)
        let incomingMessage: WebMessage
        this.stompClient = Stomp.over(ws)
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/topic', message => {
                incomingMessage = JSON.parse(message.body)
            })
        })
        return of(incomingMessage)
    }

    sendMessage(message: WebMessage) {
        this.stompClient.send("/api/message", {}, JSON.stringify(message))
    }
}