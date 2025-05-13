package backend.com.code.cinemaebooking.service;

import backend.com.code.cinemaebooking.Utils.MyCipher;
import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.bean.Promotion;
import backend.com.code.cinemaebooking.bean.User;
import backend.com.code.cinemaebooking.facade.CinemaFacade;
import backend.com.code.cinemaebooking.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class UserService {

    private final CinemaFacade cinemaFacade;

    @Autowired
    public UserService(CinemaFacade cinemaFacade) {
        this.cinemaFacade = cinemaFacade;
    }

    public User findByUserId(int id) {
        return cinemaFacade.findByUserId(id);
    }

    public void addUser(User user) {
        cinemaFacade.addUser(user);
    }

    public void addUserNoE(User user) {
        cinemaFacade.addUserNoE(user);
    }

    public void changePassword(String u_email, String password) {
        cinemaFacade.changePassword(u_email, password);
    }

    public void changeProfile(String u_email, String u_firstname, String u_lastname, String u_name,
            String u_phone,
            int u_promo) {
        cinemaFacade.changeProfile(u_email, u_firstname, u_lastname, u_name, u_phone, u_promo);
    }

    public void changeProfileAll(User user) {
        cinemaFacade.changeProfileAll(user);
    }

    public User findUserByEmail(String u_email) {
        return cinemaFacade.findByEmail(u_email);
    }

    public User findUserWithId(int u_id) {
        return cinemaFacade.findUserWithId(u_id);
    }

    public String getDecrypt(String u_email) {
        return cinemaFacade.getDecrypt(u_email);
    }

    public List<String> getDecryptCredit(String u_email) {
        return cinemaFacade.getDecryptCredit(u_email);
    }

    public User getByName(String u_name) {
        return cinemaFacade.getByName(u_name);
    }

    public List<User> findAll() {
        return cinemaFacade.findAllUsers();
    }

    public void ban(String u_name) {
        cinemaFacade.ban(u_name);
    }

    public Promotion getPromo(String code) {
        return cinemaFacade.getPromo(code);
    }

    public void addPromo(Promotion promotion) {
        cinemaFacade.addPromo(promotion);
    }

    public List<Promotion> getAllPromo() {
        return cinemaFacade.getAllPromo();
    }

    public void deletePromo(String code) {
        cinemaFacade.deletePromo(code);
    }

    public User getUserByName(String u_name) {
        return cinemaFacade.getUserByName(u_name);
    }

    public void addCard(String u_email, String credit_number, String credit_date, int credit_sc, String credit_name,
            int cardNum) {
        cinemaFacade.addCard(u_email, credit_number, credit_date, credit_sc, credit_name, cardNum);
    }

    public void promote(String u_name) {
        cinemaFacade.promote(u_name);
    }

    // @Autowired
    // private UserRepository userRepository;

    // public void addUser(User user) {
    // MyCipher myCipher = new MyCipher();
    // try {
    // String newString = myCipher.encrypt(user.getU_pwd(), "b");
    // user.setU_pwd(newString);
    // newString = myCipher.encrypt(user.getCredit_number1(), "b");
    // user.setCredit_number1(newString);
    // newString = myCipher.encrypt(user.getCredit_number2(), "b");
    // user.setCredit_number2(newString);
    // newString = myCipher.encrypt(user.getCredit_number3(), "b");
    // user.setCredit_number3(newString);
    // } catch (Exception e) {
    // // Handle the exception, e.g., log it or show an error message
    // }
    // userRepository.save(user);
    // }

    // public void changePassword(String u_email, String password) {
    // User user = userRepository.findByEmail(u_email);
    // MyCipher myCipher = new MyCipher();
    // try {
    // String newString = myCipher.encrypt(password, "b");
    // user.setU_pwd(newString);
    // } catch (Exception e) {
    // // Handle the exception, e.g., log it or show an error message
    // }
    // userRepository.save(user);
    // }

    // public void changeProfile(String u_email, String u_firstname, String
    // u_lastname, String u_name,
    // String u_phone,
    // int u_promo) {
    // User user = userRepository.findByEmail(u_email);
    // user.setU_firstname(u_firstname);
    // user.setU_lastname(u_lastname);
    // user.setU_name(u_name);
    // user.setU_phone(u_phone);
    // user.setU_promo(u_promo);
    // userRepository.save(user);
    // }

    // public void changeProfileAll(User user) {
    // userRepository.save(user);
    // }

    // public User findUserByEmail(String u_email) {
    // User user = userRepository.findByEmail(u_email);
    // return user;
    // }

    // public User findUserWithId(int u_id) {
    // User user = userRepository.findByUserId(u_id);
    // return user;
    // }

    // public User getUserWithEmail(String u_email) {
    // User user = userRepository.findByEmail(u_email);
    // return user;
    // }

    // public String getDecrypt(String u_email) {
    // User user = userRepository.findByEmail(u_email);
    // MyCipher myCipher = new MyCipher();
    // try {
    // String newString = myCipher.decrypt(user.getU_pwd(), "b");
    // return newString;
    // } catch (Exception e) {
    // // Handle the exception, e.g., log it or show an error message
    // return e.getMessage();
    // }
    // }
}
