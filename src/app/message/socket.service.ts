import { BASEURL } from '../app.api';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebMessage } from './webmessage.model'
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { ErrorHandler } from '../app.error-handler';

@Injectable()
export class SocketService {
    
    private stompClient: Stomp.Client
    inMessages: BehaviorSubject<WebMessage[]> = new BehaviorSubject<WebMessage[]>([])
    constructor(private http: Http) {}

    initSocket() {
        let ws = new SockJS(`${BASEURL}/ws`)
        this.stompClient = Stomp.over(ws)
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/chat', messages => {
                this.inMessages.next(JSON.parse(messages.body))
            })
        })
    }

    sendMessage(message: WebMessage) {
        this.stompClient.send("/app/send/message", {}, JSON.stringify(message))
    }

    getAllMessages(): Observable<WebMessage[]> {
        return this.http.get(`${BASEURL}/get/messages`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }
}