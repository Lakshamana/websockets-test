package com.arjuna.websocketstest.web;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import com.arjuna.websocketstest.model.WebsocketMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    
    private List<WebsocketMessage> list;

    private AtomicInteger counter;

    private final Logger log = LoggerFactory.getLogger(MessageController.class);
    public MessageController() {
        list = new ArrayList<>();
        counter = new AtomicInteger(0);
    } 
    
    @MessageMapping("/send/message")
    @SendTo("/chat")
    public WebsocketMessage receiveMessage(WebsocketMessage webMessage) {
        log.info("Message received: {}", webMessage);
        log.info("LIST BEFORE: {}", this.list);
        if(webMessage.getType().equals("SEND")){
            webMessage.setId(counter.getAndIncrement());
            log.info("AFTER: {}", webMessage);
            this.list.add(webMessage);
        } else {
            this.list.removeIf(message -> message.getId() == webMessage.getId());
        }
        log.info("LIST AFTER: {}", this.list);
        return webMessage;
    }

    @GetMapping("/destroy")
    public void destroyList() {
        this.list.clear();
    }

    @CrossOrigin(origins="*")
    @GetMapping("/get/messages")
    public List<WebsocketMessage> getAllMessages() {
        return this.list;
    }
}