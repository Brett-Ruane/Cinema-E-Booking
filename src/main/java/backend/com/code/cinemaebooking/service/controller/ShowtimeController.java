package backend.com.code.cinemaebooking.service.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.com.code.cinemaebooking.bean.Showtime;
import backend.com.code.cinemaebooking.service.ShowtimeService;

@RestController
@RequestMapping("/api/showtime")
@CrossOrigin
public class ShowtimeController {

    private ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping("/getAllForMovie")
    public List<Showtime> getAllMoviesForShowtime(@RequestParam int m_id) {
        List<Showtime> showtimes = showtimeService.getAllMoviesForShowtime(m_id);
        return showtimes;
    }

    @GetMapping("/getAllForDate")
    public List<Showtime> getAllMoviesForDate(@RequestParam int m_id, @RequestParam Date date) {
        List<Showtime> showtimes = showtimeService.getAllMoviesForDate(m_id, date);
        return showtimes;
    }

    @GetMapping("/getAllSeatsForShowtime")
    public List<String> getAllSeatsForShowtime(@RequestParam int show_id) {
        List<String> seats = showtimeService.getAllSeatsForShowtime(show_id);
        return seats;
    }

    @PostMapping("/add")
    public void addShowtime(@RequestBody Showtime showtime) {
        showtimeService.addShowtime(showtime);
    }

    @GetMapping("/getConflict")
    public boolean getConflict(@RequestParam Date date,
            @RequestParam int theater,
            @RequestParam String time) {
        return showtimeService.getConflict(date, theater, time);
    }

}