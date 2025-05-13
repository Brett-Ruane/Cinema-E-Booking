package backend.com.code.cinemaebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.com.code.cinemaebooking.bean.Movie;
import backend.com.code.cinemaebooking.bean.User;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    // You can define custom query methods here if needed
    @Query("SELECT u FROM Movie u WHERE u.m_title = :m_title")
    Movie findByName(@Param("m_title") String m_title);
}