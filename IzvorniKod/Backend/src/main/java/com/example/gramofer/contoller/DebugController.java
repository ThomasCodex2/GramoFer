package com.example.gramofer.contoller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {
    @GetMapping("/debug")
    public String debug(@RequestHeader Map<String, String> headers) {
        return "Received Cookies: " + headers.get("Cookie");
    }
}
