package kr.megabrain.sirenorderserver.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private Order order;

    // itemdetail
    private String ice;
    private String size;
    private int orderPrice;
    private int count;


    public static OrderItem createOrderItem(Item item, String ice, String size, int count) {
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setCount(count);
        orderItem.setOrderPrice(item.getPrice());
        orderItem.setIce(ice);
        orderItem.setSize(size);

        item.removeStock(count);
        return orderItem;
    }

    public int getTotalPrice(){
        return orderPrice * count;
    }
}
