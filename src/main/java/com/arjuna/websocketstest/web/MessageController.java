package com.arjuna.websocketstest.web;

import java.util.Arrays;
import java.util.List;

import com.arjuna.websocketstest.model.WebsocketMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MessageController {
    
    private List<String> list;

    private final Logger log = LoggerFactory.getLogger(MessageController.class);
    public MessageController() {
        list = Arrays.asList();
    } 
    
    @MessageMapping("/send/message")
    @SendTo("/chat")
    public WebsocketMessage receiveMessage(@Payload WebsocketMessage webMessage) {
        log.debug("Message received: {}", webMessage);
        // System.out.println("Message received: " + webMessage);
        // if(webMessage.getType().equals("SEND")){
        //     webMessage.setId(list.size() + 1);
        //     list.add(webMessage.getContent());
        //     list.stream().forEach(log::debug);
        // } else {
            
        // }
        return webMessage;
    }

    // @PostMapping("/messages")
    // public ResponseEntity<String> addMessage(@RequestParam String message) {
    //     this.list.add(message);
    //     return ResponseEntity.ok().build();
    // }

    @GetMapping("/messages")
    public List<String> getAllMessages(String message) {
        return this.list;
    }

    // @DeleteMapping("/messages/{id}")
    // public ResponseEntity<String> removeMessage(@PathVariable int id) {
    //     try {
    //         this.list.remove(id);
    //     } catch (Exception e) {
    //         return ResponseEntity.badRequest().build();
    //     }
    //     return ResponseEntity.ok().build();
    // }
}