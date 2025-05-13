package backend.com.code.cinemaebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.com.code.cinemaebooking.bean.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    @Query("SELECT u FROM Promotion u WHERE u.code = :code")
    Promotion findPromo(@Param("code") String code);
}