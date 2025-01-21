package com.example.gramofer.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.service.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    public EmailController (EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public String sendEmail(@AuthenticationPrincipal UserAccount user) {
        try {
            emailService.sendEmailToUser(user, "Welcome to Our Service!", "Thank you for joining our platform, " + user.getLastName() + "!");
            return "Email sent successfully to " + user.getEmail();
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
}