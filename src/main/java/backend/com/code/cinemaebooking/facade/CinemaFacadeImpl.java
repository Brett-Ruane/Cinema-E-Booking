package backend.com.code.cinemaebooking.facade;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import backend.com.code.cinemaebooking.Utils.MyCipher;
import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.bean.Order;
import backend.com.code.cinemaebooking.bean.Promotion;
import backend.com.code.cinemaebooking.bean.Showtime;
import backend.com.code.cinemaebooking.bean.Ticket;
import backend.com.code.cinemaebooking.bean.User;
import backend.com.code.cinemaebooking.repository.MovieRepository;
import backend.com.code.cinemaebooking.repository.OrderRepository;
import backend.com.code.cinemaebooking.repository.UserRepository;
import backend.com.code.cinemaebooking.repository.ShowtimeRepository;
import backend.com.code.cinemaebooking.repository.TicketRepository;
import backend.com.code.cinemaebooking.repository.PromotionRepository;

@Component
public class CinemaFacadeImpl implements CinemaFacade {

    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final PromotionRepository promotionRepository;
    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public CinemaFacadeImpl(
            MovieRepository movieRepository,
            UserRepository userRepository, ShowtimeRepository showtimeRepository,
            PromotionRepository promotionRepository, OrderRepository orderRepository, TicketRepository ticketRepository,
            JavaMailSender javaMailSender) {
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
        this.promotionRepository = promotionRepository;
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public User findByUserId(int id) {
        return userRepository.findByUserId(id);
    }

    @Override
    public User findByEmail(String u_email) {
        return userRepository.findByEmail(u_email);
    }

    @Override
    public void addUser(User user) {
        MyCipher myCipher = new MyCipher();
        try {
            String newString = myCipher.encrypt(user.getU_pwd(), "b");
            user.setU_pwd(newString);
            newString = myCipher.encrypt(user.getCredit_number1(), "b");
            user.setCredit_number1(newString);
            newString = myCipher.encrypt(user.getCredit_number2(), "b");
            user.setCredit_number2(newString);
            newString = myCipher.encrypt(user.getCredit_number3(), "b");
            user.setCredit_number3(newString);
        } catch (Exception e) {
            // Handle the exception, e.g., log it or show an error message
        }
        userRepository.save(user);
    }

    @Override
    public void addUserNoE(User user) {
        userRepository.save(user);
    }

    @Override
    public void changePassword(String u_email, String password) {
        User user = userRepository.findByEmail(u_email);
        MyCipher myCipher = new MyCipher();
        try {
            String newString = myCipher.encrypt(password, "b");
            user.setU_pwd(newString);
        } catch (Exception e) {
            // Handle the exception, e.g., log it or show an error message
        }
        userRepository.save(user);
    }

    @Override
    public void changeProfile(String u_email, String u_firstname, String u_lastname, String u_name,
            String u_phone,
            int u_promo) {
        User user = userRepository.findByEmail(u_email);
        user.setU_firstname(u_firstname);
        user.setU_lastname(u_lastname);
        user.setU_name(u_name);
        user.setU_phone(u_phone);
        user.setU_promo(u_promo);
        userRepository.save(user);
    }

    @Override
    public void changeProfileAll(User user) {
        MyCipher myCipher = new MyCipher();
        try {
            String newString = myCipher.encrypt(user.getCredit_number1(), "b");
            user.setCredit_number1(newString);
            newString = myCipher.encrypt(user.getCredit_number2(), "b");
            user.setCredit_number2(newString);
            newString = myCipher.encrypt(user.getCredit_number3(), "b");
            user.setCredit_number3(newString);
        } catch (Exception e) {
            // Handle the exception, e.g., log it or show an error message
        }
        userRepository.save(user);
    }

    @Override
    public User findUserWithId(int u_id) {
        User user = userRepository.findByUserId(u_id);
        return user;
    }

    @Override
    public String getDecrypt(String u_email) {
        User user = userRepository.findByEmail(u_email);
        MyCipher myCipher = new MyCipher();
        try {
            String newString = myCipher.decrypt(user.getU_pwd(), "b");
            return newString;
        } catch (Exception e) {
            // Handle the exception, e.g., log it or show an error message
            return e.getMessage();
        }
    }

    @Override
    public List<String> getDecryptCredit(String u_email) {
        User user = userRepository.findByEmail(u_email);
        MyCipher myCipher = new MyCipher();
        List<String> newString = new ArrayList<>();
        try {
            if (user != null) {
                if (user.getCredit_number1() != null) {
                    String decrypted1 = myCipher.decrypt(user.getCredit_number1(), "b");
                    newString.add(decrypted1);
                }
                if (user.getCredit_number2() != null) {
                    String decrypted2 = myCipher.decrypt(user.getCredit_number2(), "b");
                    newString.add(decrypted2);
                }
                if (user.getCredit_number3() != null) {
                    String decrypted3 = myCipher.decrypt(user.getCredit_number3(), "b");
                    newString.add(decrypted3);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return newString;
    }

    @Override
    public void addMovie(Movie movie) {
        movieRepository.save(movie);
    }

    @Override
    public List<Movie> findAll() {
        List<Movie> movies = movieRepository.findAll();
        return movies;
    }

    @Override
    public Movie findByName(String name) {
        Movie movie = movieRepository.findByName(name);
        return movie;
    }

    @Override
    public String generateVerificationToken(String email) {
        // Generate a unique verification token
        String token = UUID.randomUUID().toString();

        // Find the user by email
        User user = userRepository.findByEmail(email);

        if (user != null) {
            // Set the verification token for the user
            user.setU_token(token);
            userRepository.save(user); // Save the updated user to the database
        }

        return token;
    }

    @Override
    public boolean checkCode(String email, String code) {
        // Find the user by email
        User user = userRepository.findByEmail(email);

        if (user != null) {
            // Use .equals() to compare strings instead of '=='.
            // '==' checks for reference equality, .equals() checks for content equality.
            if (code.equals(user.getU_token())) {
                user.setU_mark("active");
                userRepository.save(user); // Save the updated user to the database
                return true;
            }
        }
        return false;
    }

    @Override
    public void sendVerificationEmail(String toEmail, String verificationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Verify Your Email");
        message.setText(
                "Click the following link to verify your email: http://localhost:3000/verify" + "\nYour code is "
                        + verificationToken);
        javaMailSender.send(message);
    }

    // @Override
    // public void sendPasswordEmail(String toEmail) {
    // User user = userRepository.findByEmail(toEmail);
    // MyCipher myCipher = new MyCipher();
    // String newString = "";
    // try {
    // newString = myCipher.decrypt(user.getU_pwd(), "b");
    // } catch (Exception e) {
    // // Handle the exception, e.g., log it or show an error message
    // }
    // SimpleMailMessage message = new SimpleMailMessage();
    // message.setTo(toEmail);
    // message.setSubject("Your Password");
    // message.setText(
    // "Your Password is " + newString);
    // javaMailSender.send(message);
    // }

    @Override
    public void sendPasswordEmail(String toEmail) {
        User user = userRepository.findByEmail(toEmail);
        if (user != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your Password");
            message.setText(
                    "Use This token to change Password " + user.getU_token());
            javaMailSender.send(message);
        }
    }

    @Override
    public User getByName(String u_name) {
        User user = userRepository.findByName(u_name);
        return user;
    }

    @Override
    public List<User> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public void ban(String u_name) {
        User user = userRepository.findByName(u_name);
        user.setU_mark("banned");
        userRepository.save(user);
    }

    @Override
    public Promotion getPromo(String code) {
        return promotionRepository.findPromo(code);
    }

    @Override
    public void addPromo(Promotion promotion) {
        promotionRepository.save(promotion);
    }

    @Override
    public List<Showtime> getAllMoviesForShowtime(int m_id) {
        List<Showtime> showtimes = showtimeRepository.findAllShowTimesForMovie(m_id);
        return showtimes;
    }

    @Override
    public List<Showtime> getAllMoviesForDate(int m_id, Date date) {
        List<Showtime> showtimes = showtimeRepository.getAllMoviesForDate(m_id, date);
        return showtimes;
    }

    @Override
    public Order createOrder(List<Ticket> ticketList, float total, int u_id, String o_datetime) {
        // Create an order
        Order order = new Order();
        order.setO_total(total);
        order.setU_id(u_id);
        order.setO_datetime(o_datetime);
        Order savedOrder = orderRepository.save(order);
        orderRepository.flush();

        int orderID = savedOrder.getO_id();
        for (Ticket ticket : ticketList) {
            ticket.setO_id(orderID);
            ticketRepository.save(ticket);
            ticketRepository.flush();
        }

        return savedOrder;
    }

    @Override
    public void sendConfirmationEmail(SimpleMailMessage message) {
        javaMailSender.send(message);
    }

    @Override
    public List<String> getAllSeatsForShowtime(int show_id) {
        List<Ticket> ticketsForShow = ticketRepository.findAllByShowId(show_id);
        List<String> seatsList = new ArrayList<>();

        for (Ticket ticket : ticketsForShow) {
            String seatPosition = ticket.getRow_id() + "," + ticket.getColumn_id();
            seatsList.add(seatPosition);
        }

        return seatsList;
    }

    @Override
    public List<Promotion> getAllPromo() {
        return promotionRepository.findAll();
    }

    @Override
    public void deleteMovie(String movieName) {
        Movie movie = movieRepository.findByName(movieName);
        movieRepository.delete(movie);
    }

    @Override
    public void deletePromo(String code) {
        Promotion promotion = promotionRepository.findPromo(code);
        promotionRepository.delete(promotion);
    }

    @Override
    public void sendPromo(String code) {
        List<User> users = userRepository.findAllPromoUsers(1);
        for (User user : users) {
            String toEmail = user.getU_email();
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Special Promo Notification");
            message.setText("Hello " + user.getU_name() + ",\n\n"
                    + "We are excited to inform you about our special promotion with code: " + code + ".\n"
                    + "Don't miss out on this great offer!\n\n"
                    + "Best regards,\nYourApp Team");
            javaMailSender.send(message);
        }
        Promotion promo = promotionRepository.findPromo(code);
        promo.setP_sent(1);
        promotionRepository.save(promo);
    }

    @Override
    public User getUserByName(String u_name) {
        User user = userRepository.findByName(u_name);
        return user;
    }

    @Override
    public void addShowtime(Showtime showtime) {
        showtimeRepository.save(showtime);
    }

    @Override
    public boolean getConflict(Date date, int theater, String time) {
        List<Showtime> showtime = showtimeRepository.findConflictingShowtimes(date, theater, time);
        if (showtime.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void addCard(String u_email, String credit_number, String credit_date, int credit_sc, String credit_name,
            int cardNum) {
        User user = userRepository.findByEmail(u_email);
        MyCipher myCipher = new MyCipher();
        if (cardNum == 1) {
            try {
                String newString = myCipher.encrypt(credit_number, "b");
                user.setCredit_number1(newString);
                user.setCredit_date1(credit_date);
                user.setCredit_sc1(credit_sc);
                user.setCredit_name1(credit_name);
                userRepository.save(user);
            } catch (Exception e) {
                // Handle the exception, e.g., log it or show an error message
            }
        } else if (cardNum == 2) {
            try {
                String newString = myCipher.encrypt(credit_number, "b");
                user.setCredit_number2(newString);
                user.setCredit_date2(credit_date);
                user.setCredit_sc2(credit_sc);
                user.setCredit_name2(credit_name);
                userRepository.save(user);
            } catch (Exception e) {
                // Handle the exception, e.g., log it or show an error message
            }
        } else if (cardNum == 3) {
            try {
                String newString = myCipher.encrypt(credit_number, "b");
                user.setCredit_number3(newString);
                user.setCredit_date3(credit_date);
                user.setCredit_sc3(credit_sc);
                user.setCredit_name3(credit_name);
                userRepository.save(user);
            } catch (Exception e) {
                // Handle the exception, e.g., log it or show an error message
            }
        }
    }

    @Override
    public List<Order> getAllForUser(int u_id) {
        return orderRepository.getAllOrders(u_id);
    }

    @Override
    public void promote(String u_name) {
        User user = userRepository.findByName(u_name);
        user.setU_role(1);
        userRepository.save(user);
    }
}
