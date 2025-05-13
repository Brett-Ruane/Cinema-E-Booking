package backend.com.code.cinemaebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.facade.CinemaFacade;
import backend.com.code.cinemaebooking.repository.MovieRepository;

@Service
public class MovieService {

    private final CinemaFacade cinemaFacade;

    @Autowired
    public MovieService(CinemaFacade cinemaFacade) {
        this.cinemaFacade = cinemaFacade;
    }

    public void addMovie(Movie movie) {
        cinemaFacade.addMovie(movie);
    }

    public List<Movie> findAll() {
        return cinemaFacade.findAll();
    }

    public Movie findByName(String name) {
        return cinemaFacade.findByName(name);
    }

    public void deleteMovie(String movieName) {
        cinemaFacade.deleteMovie(movieName);
    }

}
