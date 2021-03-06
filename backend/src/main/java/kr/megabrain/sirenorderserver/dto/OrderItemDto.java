package kr.megabrain.sirenorderserver.dto;

import kr.megabrain.sirenorderserver.entity.OrderItem;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderItemDto {

    private String itemName;

    private String ice;

    private String size;

    private int count;

    private int orderPrice;

    public OrderItemDto() {}

    public static OrderItemDto of(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.itemName = orderItem.getItem().getItemName();
        orderItemDto.ice = orderItem.getIce();
        orderItemDto.size = orderItem.getSize();
        orderItemDto.count = orderItem.getCount();
        orderItemDto.orderPrice = orderItem.getOrderPrice();
        return orderItemDto;
    }
}
