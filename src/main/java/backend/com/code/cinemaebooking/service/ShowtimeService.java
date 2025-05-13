package backend.com.code.cinemaebooking.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.code.cinemaebooking.bean.Showtime;
import backend.com.code.cinemaebooking.facade.CinemaFacade;

@Service
public class ShowtimeService {

    private final CinemaFacade cinemaFacade;

    @Autowired
    public ShowtimeService(CinemaFacade cinemaFacade) {
        this.cinemaFacade = cinemaFacade;
    }

    public List<Showtime> getAllMoviesForShowtime(int m_id) {
        return cinemaFacade.getAllMoviesForShowtime(m_id);
    }

    public List<Showtime> getAllMoviesForDate(int m_id, Date date) {
        return cinemaFacade.getAllMoviesForDate(m_id, date);
    }

    public List<String> getAllSeatsForShowtime(int show_id) {
        return cinemaFacade.getAllSeatsForShowtime(show_id);
    }

    public void addShowtime(Showtime showtime) {
        cinemaFacade.addShowtime(showtime);
    }

    public boolean getConflict(Date date, int theater, String time) {
        return cinemaFacade.getConflict(date, theater, time);
    }

}