package backend.com.code.cinemaebooking.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import backend.com.code.cinemaebooking.repository.UserRepository;
import backend.com.code.cinemaebooking.service.UserService;
import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.bean.Promotion;
import backend.com.code.cinemaebooking.bean.User;
import backend.com.code.cinemaebooking.Utils.MyCipher;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PostMapping("/addNoE")
    public void addUserNoE(@RequestBody User user) {
        userService.addUserNoE(user);
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestParam String u_email, String password) {
        userService.changePassword(u_email, password);
    }

    @PostMapping("/change-profile")
    public void changeProfile(@RequestParam String u_email, String u_firstname, String u_lastname, String u_name,
            String u_phone,
            int u_promo) {
        userService.changeProfile(u_email, u_firstname, u_lastname, u_name, u_phone, u_promo);
    }

    @PostMapping("/change-profile-all")
    public void changeProfileAll(@RequestBody User user) {
        userService.changeProfileAll(user);
    }

    @GetMapping("/findUserByEmail")
    public User findUserByEmail(@RequestParam String u_email) {
        User user = userService.findUserByEmail(u_email);
        return user;
    }

    @GetMapping("/getUserByEmail")
    public User getUserByEmail(@RequestParam String u_email) {
        User user = userService.findUserByEmail(u_email);
        return user;
    }

    @GetMapping("/getUserByName")
    public User getUserByName(@RequestParam String u_name) {
        User user = userService.getUserByName(u_name);
        return user;
    }

    @GetMapping("/findUserWithId")
    public User findUserById(@RequestParam int u_id) {
        User user = userService.findUserWithId(u_id);
        return user;
    }

    @GetMapping("/getDecrypt")
    public String getDecrypt(@RequestParam String u_email) {
        return userService.getDecrypt(u_email);
    }

    @GetMapping("/getDecryptCredit")
    public List<String> getDecryptCredit(@RequestParam String u_email) {
        return userService.getDecryptCredit(u_email);
    }

    @GetMapping("/getAll")
    public List<User> getAll() {
        List<User> users = userService.findAll();
        return users;
    }

    @PostMapping("/ban")
    public void ban(@RequestParam String u_name) {
        userService.ban(u_name);
    }

    @GetMapping("/getPromo")
    public Promotion getPromo(@RequestParam String code) {
        return userService.getPromo(code);
    }

    @PostMapping("/addPromo")
    public void addPromo(@RequestBody Promotion promotion) {
        userService.addPromo(promotion);
    }

    @GetMapping("/getAllPromo")
    public List<Promotion> getAllPromo() {
        List<Promotion> promos = userService.getAllPromo();
        return promos;
    }

    @PostMapping("/deletePromo")
    public void deletePromo(@RequestParam String code) {
        userService.deletePromo(code);
    }

    @PostMapping("/addCard")
    public void addCard(@RequestParam String u_email, @RequestParam String credit_number,
            @RequestParam String credit_date,
            @RequestParam int credit_sc, @RequestParam String credit_name, @RequestParam int cardNum) {
        userService.addCard(u_email, credit_number, credit_date, credit_sc, credit_name, cardNum);
    }

    @PostMapping("/promote")
    public void promote(@RequestParam String u_name) {
        userService.promote(u_name);
    }

}