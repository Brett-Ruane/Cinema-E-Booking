package backend.com.code.cinemaebooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.com.code.cinemaebooking.bean.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    // You can define custom query methods here if needed
    @Query("SELECT u FROM User u WHERE u.u_email = :u_email")
    User findByEmail(@Param("u_email") String u_email);

    @Query("SELECT u FROM User u WHERE u.u_id = :u_id")
    User findByUserId(@Param("u_id") int u_id);

    @Query("SELECT u FROM User u WHERE u.u_name = :u_name")
    User findByName(@Param("u_name") String u_name);

    @Query("SELECT u FROM User u WHERE u.u_promo = :u_promo AND u.u_role != 1")
    List<User> findAllPromoUsers(@Param("u_promo") int u_promo);
}