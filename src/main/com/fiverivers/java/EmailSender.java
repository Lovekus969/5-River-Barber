package com.fiverivers;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailSender {

    public static void sendEmail(String ownerEmail, String customerName, String appointmentTime) {
        final String senderEmail = "yourgmail@gmail.com"; // Your Gmail
        final String senderPassword = "your-app-password"; // Gmail app password (not raw password!)

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(ownerEmail));
            message.setSubject("New Appointment Booking");
            message.setText("New appointment from " + customerName + " at " + appointmentTime);

            Transport.send(message);
            System.out.println("Email sent to owner successfully!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
