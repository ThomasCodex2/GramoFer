//package com.example.gramofer.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//
//import java.util.Properties;
//
//@Configuration
//public class MailConfig {
//
//    @Bean
//    public JavaMailSender getJavaMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//        mailSender.setHost("smtp.gmail.com"); // Replace with your SMTP server
//        mailSender.setPort(587);
//
//        mailSender.setUsername(System.getenv("GOOGLE_EMAIL")); // Replace with your email
//        mailSender.setPassword(System.getenv("GOOGLE_EMAIL_PASSWORD")); // Replace with your password
//
//        System.out.println(mailSender.getUsername());
//        System.out.println(mailSender.getPassword());
//
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.starttls.required", "true");
//        props.put("mail.smtp.connectiontimeout", "5000"); // Optional
//        props.put("mail.smtp.timeout", "5000");           // Optional
//        props.put("mail.smtp.writetimeout", "5000");
//        props.put("mail.debug", "true");
//
//        return mailSender;
//    }
//}
