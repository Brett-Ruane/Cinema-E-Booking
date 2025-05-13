package backend.com.code.cinemaebooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.com.code.cinemaebooking.bean.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    @Query("SELECT t FROM Ticket t WHERE t.show_id = :show_id")
    List<Ticket> findAllByShowId(@Param("show_id") int show_id);
}