package kr.megabrain.sirenorderserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDto {

    private String itemName;
    private int price;
    private int stockNumber;
    private boolean isSell;
}
