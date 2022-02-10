package kr.megabrain.sirenorderserver.dto;

import kr.megabrain.sirenorderserver.constant.OrderStatus;
import kr.megabrain.sirenorderserver.entity.Order;
import lombok.Getter;
import lombok.Setter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class OrderHistoryDto {

    private String orderId;

    private String orderDate;

    private OrderStatus orderStatus;

    private List<OrderItemDto> orderItemDtos = new ArrayList<>();

    public OrderHistoryDto(){}

    public static OrderHistoryDto of(Order order) {
        OrderHistoryDto orderHistoryDto = new OrderHistoryDto();
        orderHistoryDto.orderId = order.getId();
        orderHistoryDto.orderDate = order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        orderHistoryDto.orderStatus = order.getOrderStatus();
        return orderHistoryDto;
    }

    public void addOrderItemDto(OrderItemDto orderItemDto) {
        this.orderItemDtos.add(orderItemDto);
    }
}
