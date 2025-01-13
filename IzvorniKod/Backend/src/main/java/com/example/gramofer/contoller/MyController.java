package com.example.gramofer.contoller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    @GetMapping("/test")
    public ResponseEntity<String> test(@RequestHeader(value = "Cookie", required = false) String cookie) {
        return ResponseEntity.ok("Cookie ignored: " + cookie);
    }
}