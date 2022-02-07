package kr.megabrain.sirenorderserver.entity;

import kr.megabrain.sirenorderserver.dto.ItemDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    @Column(unique = true)
    private String itemName;

    private int price;

    private int stockNumber;

    public void removeStock(int count) {
        this.stockNumber -= count;
    }

    public static Item createItem(ItemDto itemDto) {
        Item item = new Item();
        item.setItemName(itemDto.getItemName());
        item.setPrice(itemDto.getPrice());
        item.setStockNumber(itemDto.getStockNumber());
        return item;
    }
}
