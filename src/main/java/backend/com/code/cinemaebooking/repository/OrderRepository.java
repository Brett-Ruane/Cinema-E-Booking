package backend.com.code.cinemaebooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.com.code.cinemaebooking.bean.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE o.u_id = :u_id")
    List<Order> getAllOrders(@Param("u_id") int u_id);
}