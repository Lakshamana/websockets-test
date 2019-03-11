package com.arjuna.websocketstest.web;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import com.arjuna.websocketstest.model.WebsocketMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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
        counter = new AtomicInteger(-1);
    } 
    
    @MessageMapping("/send/message")
    @SendTo("/chat")
    public List<WebsocketMessage> receiveMessage(@Payload WebsocketMessage webMessage) {
        log.info("Message received: {}", webMessage);
        if(webMessage.getType().equals("SEND")){
            webMessage.setId(counter.incrementAndGet());
            this.list.add(webMessage);
            log.info("LIST AFTER ADD: {}", this.list);
        } else {
            this.list.removeIf(message -> message.getId() == webMessage.getId());
            log.info("LIST AFTER REMOVES: {}", this.list);
        }
        return this.list;
    }
}