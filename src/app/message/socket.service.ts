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
    constructor(private http: Http) {}

    initSocket(): Observable<WebMessage> {
        let ws = new SockJS(`${BASEURL}/ws`)
        this.stompClient = Stomp.over(ws)
        let incomingMessage: WebMessage
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/chat', message => {
                incomingMessage = JSON.parse(message.body)
            })
        })
        return of(incomingMessage)
    }

    sendMessage(message: WebMessage) {
        this.stompClient.send("/app/send/message", {}, JSON.stringify(message))
    }

    getAllMessages(): Promise<WebMessage[]> {
        return this.http.get(`${BASEURL}/get/messages`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
            .toPromise()
    }
}