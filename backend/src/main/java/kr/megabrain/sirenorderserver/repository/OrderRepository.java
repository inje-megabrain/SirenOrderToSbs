package kr.megabrain.sirenorderserver.repository;

import kr.megabrain.sirenorderserver.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o " + "order by o.orderDate desc")
    List<Order> findOrders();

}