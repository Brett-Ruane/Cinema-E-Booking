package backend.com.code.cinemaebooking.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import backend.com.code.cinemaebooking.Utils.MyCipher;
import backend.com.code.cinemaebooking.bean.User;
import backend.com.code.cinemaebooking.facade.CinemaFacade;
import backend.com.code.cinemaebooking.repository.UserRepository;

@Service
public class EmailService {

    private final CinemaFacade cinemaFacade;

    @Autowired
    public EmailService(CinemaFacade cinemaFacade) {
        this.cinemaFacade = cinemaFacade;
    }

    public String generateVerificationToken(String email) {
        return cinemaFacade.generateVerificationToken(email);
    }

    public boolean checkCode(String email, String code) {
        return cinemaFacade.checkCode(email, code);
    }

    public void sendVerificationEmail(String toEmail, String verificationToken) {
        cinemaFacade.sendVerificationEmail(toEmail, verificationToken);
    }

    public void sendConfirmationEmail(SimpleMailMessage message) {
        cinemaFacade.sendConfirmationEmail(message);
    }

    public void sendPasswordEmail(String toEmail) {
        cinemaFacade.sendPasswordEmail(toEmail);
    }

    public void sendPromo(String code) {
        cinemaFacade.sendPromo(code);
    }
}
