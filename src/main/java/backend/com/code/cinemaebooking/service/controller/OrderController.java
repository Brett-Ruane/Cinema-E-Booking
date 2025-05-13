package backend.com.code.cinemaebooking.service.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.com.code.cinemaebooking.repository.MovieRepository;
import backend.com.code.cinemaebooking.service.EmailService;
import backend.com.code.cinemaebooking.service.MovieService;
import backend.com.code.cinemaebooking.service.OrderService;
import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.bean.Order;
import backend.com.code.cinemaebooking.bean.Ticket;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create-order")
    public Order createOrder(@RequestBody List<Ticket> order, @RequestParam float total, @RequestParam int u_id,
            @RequestParam String o_datetime) {
        return orderService.createOrder(order, total, u_id, o_datetime);
    }

    @GetMapping("/getAllForUser")
    public List<Order> getAllForUser(@RequestParam int u_id) {
        return orderService.getAllForUser(u_id);
    }

}