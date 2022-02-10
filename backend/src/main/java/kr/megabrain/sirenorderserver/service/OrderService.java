package kr.megabrain.sirenorderserver.service;

import kr.megabrain.sirenorderserver.constant.OrderStatus;
import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.dto.OrderHistoryDto;
import kr.megabrain.sirenorderserver.dto.OrderItemDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.entity.Order;
import kr.megabrain.sirenorderserver.entity.OrderItem;
import kr.megabrain.sirenorderserver.repository.ItemRepository;
import kr.megabrain.sirenorderserver.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;

    public Order order(OrderDto orderDto, String email) {
        Item item = itemRepository.findById(orderDto.getItemId())
                .orElseThrow(EntityNotFoundException::new);
        // 이메일 생략
        List<OrderItem> orderItems = new ArrayList<>();
        OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getIce(), orderDto.getSize(), orderDto.getCount());
        orderItems.add(orderItem);

        Order order = Order.createOrder(orderItems);
        orderRepository.save(order);

        return order;
    }

    public void setOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);
        order.setOrderStatus(status);
        orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<OrderHistoryDto> allOrder() {
        List<Order> orders = orderRepository.findOrders();
        List<OrderHistoryDto> orderHistoryDtos = new ArrayList<>();

        for (Order order : orders) {
            OrderHistoryDto orderHistoryDto = OrderHistoryDto.of(order);

            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                OrderItemDto orderItemDto = OrderItemDto.of(orderItem);
                orderHistoryDto.addOrderItemDto(orderItemDto);
            }
            orderHistoryDtos.add(orderHistoryDto);
        }

        return orderHistoryDtos;
    }

}
