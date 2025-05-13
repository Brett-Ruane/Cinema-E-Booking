package backend.com.code.cinemaebooking.service;

import backend.com.code.cinemaebooking.bean.Ticket;
import backend.com.code.cinemaebooking.facade.CinemaFacade;
import backend.com.code.cinemaebooking.bean.Order;
import backend.com.code.cinemaebooking.bean.Movie;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class OrderService {

    private final CinemaFacade cinemaFacade;

    @Autowired
    public OrderService(CinemaFacade cinemaFacade) {
        this.cinemaFacade = cinemaFacade;
    }

    public Order createOrder(List<Ticket> order, float total, int u_id, String o_datetime) {
        return cinemaFacade.createOrder(order, total, u_id, o_datetime);
    }

    public List<Order> getAllForUser(@RequestParam int u_id) {
        return cinemaFacade.getAllForUser(u_id);
    }

}
