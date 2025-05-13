package backend.com.code.cinemaebooking.service.controller;

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
import backend.com.code.cinemaebooking.bean.Movie;

@RestController
@RequestMapping("/api/movie")
@CrossOrigin
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/add")
    public void addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
    }

    @GetMapping("/getAll")
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieService.findAll();
        return movies;
    }

    @GetMapping("/getByName")
    public Movie getByName(@RequestParam String m_title) {
        Movie movie = movieService.findByName(m_title);
        return movie;
    }

    @PostMapping("/delete")
    public void deleteMovie(@RequestParam String movieName) {
        movieService.deleteMovie(movieName);
    }

}
