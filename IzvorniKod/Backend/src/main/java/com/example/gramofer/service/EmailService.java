//package com.example.gramofer.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import com.example.gramofer.model.UserAccount;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public EmailService (JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//    public void sendEmailToUser(UserAccount user, String subject, String body) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        System.out.println("Bla bla " + System.getenv("GOOGLE_EMAIL"));
//        System.out.println(user.getEmail());
//        System.out.println(subject);
//        System.out.println(body);
//        message.setFrom(System.getenv("GOOGLE_EMAIL"));
//        message.setTo(user.getEmail());
//        message.setSubject(subject);
//        message.setText(body);
//
//        mailSender.send(message);
//        System.out.println("Email sent successfully to " + user.getEmail());
//    }
//}