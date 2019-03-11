package com.arjuna.websocketstest.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/home")
public class HomeController {

    @GetMapping()
    public String showHome(Model model) {
        return "forward:/index.html";
    }
}