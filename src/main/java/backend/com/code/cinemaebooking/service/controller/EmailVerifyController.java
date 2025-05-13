package backend.com.code.cinemaebooking.service.controller;

import java.sql.Date;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.com.code.cinemaebooking.service.EmailService;

@RestController
@RequestMapping("/api/email")
@CrossOrigin
public class EmailVerifyController {

    private final EmailService emailService;

    public EmailVerifyController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-verification-email")
    public void sendVerificationEmail(@RequestParam String u_email) {
        String toEmail = u_email;
        String verificationToken = emailService.generateVerificationToken(toEmail);
        emailService.sendVerificationEmail(toEmail, verificationToken);
    }

    @PostMapping("/send-confirmation-email")
    public void sendConfirmationEmail(@RequestParam String u_email, @RequestParam int o_id, @RequestParam int a,
            @RequestParam int c, @RequestParam int s, @RequestParam float total, @RequestParam String movieName,
            @RequestParam Date date, @RequestParam String time) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(u_email);
        message.setSubject("Order Number: " + o_id);
        message.setText(
                "Purchase of " + a + " Adult tickets, " + c + " Child tickets, " + s + " Senor tickets for the movie, "
                        + movieName + " on " + date + " at " + time);
        emailService.sendConfirmationEmail(message);
    }

    @PostMapping("/send-password-email")
    public void sendpasswordEmail(@RequestParam String u_email) {
        String toEmail = u_email;
        emailService.sendPasswordEmail(toEmail);
    }

    @PostMapping("/verify")
    public boolean checkToken(@RequestParam String u_email, String code) {
        return emailService.checkCode(u_email, code);
    }

    @PostMapping("/sendPromo")
    public void sendPromo(@RequestParam String code) {
        emailService.sendPromo(code);
    }
}
