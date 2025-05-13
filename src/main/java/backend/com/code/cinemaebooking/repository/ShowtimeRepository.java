package backend.com.code.cinemaebooking.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.com.code.cinemaebooking.bean.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    @Query("SELECT u FROM Showtime u WHERE u.m_id = :m_id")
    List<Showtime> findAllShowTimesForMovie(@Param("m_id") int m_id);

    @Query("SELECT u FROM Showtime u WHERE u.m_id = :m_id AND u.date = :date")
    List<Showtime> getAllMoviesForDate(@Param("m_id") int m_id, @Param("date") Date date);

    @Query("SELECT s FROM Showtime s WHERE s.date = :date "
            + "AND s.theater = :theater "
            + "AND ABS(TIME_TO_SEC(TIMEDIFF(s.time, :time))) < (3 * 60 * 60)")
    List<Showtime> findConflictingShowtimes(
            @Param("date") Date date,
            @Param("theater") int theater,
            @Param("time") String time);
}