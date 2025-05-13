package backend.com.code.cinemaebooking.facade;

import java.sql.Date;
import java.util.List;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.RequestParam;

import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.bean.Order;
import backend.com.code.cinemaebooking.bean.Promotion;
import backend.com.code.cinemaebooking.bean.Showtime;
import backend.com.code.cinemaebooking.bean.Ticket;
import backend.com.code.cinemaebooking.bean.User;

public interface CinemaFacade {
        Movie findByName(String m_title);

        User findByEmail(String u_email);

        User findByUserId(int u_id);

        void addUser(User user);

        void addUserNoE(User user);

        void changePassword(String u_email, String password);

        void changeProfile(String u_email, String u_firstname, String u_lastname, String u_name, String u_phone,
                        int u_promo);

        void changeProfileAll(User user);

        User findUserWithId(int u_id);

        String getDecrypt(String u_email);

        List<String> getDecryptCredit(String u_email);

        void addMovie(Movie movie);

        List<Movie> findAll();

        List<User> findAllUsers();

        String generateVerificationToken(String email);

        boolean checkCode(String email, String code);

        void sendVerificationEmail(String toEmail, String verificationToken);

        void sendPasswordEmail(String toEmail);

        User getByName(String u_name);

        void ban(String u_name);

        Promotion getPromo(String code);

        void addPromo(Promotion promotion);

        List<Showtime> getAllMoviesForShowtime(int m_id);

        List<Showtime> getAllMoviesForDate(int m_id, Date date);

        Order createOrder(List<Ticket> ticketList, float total, int u_id, String o_datetime);

        void sendConfirmationEmail(SimpleMailMessage message);

        List<String> getAllSeatsForShowtime(int show_id);

        List<Promotion> getAllPromo();

        void deleteMovie(String movieName);

        void deletePromo(String code);

        void sendPromo(String code);

        User getUserByName(String u_name);

        void addShowtime(Showtime showtime);

        boolean getConflict(Date date, int theater, String time);

        void addCard(String u_email, String credit_number, String credit_date, int credit_sc, String credit_name,
                        int cardNum);

        List<Order> getAllForUser(int u_id);

        void promote(String u_name);
}