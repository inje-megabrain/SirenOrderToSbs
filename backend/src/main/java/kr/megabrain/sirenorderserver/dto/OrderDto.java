package kr.megabrain.sirenorderserver.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class OrderDto {

    private Long itemId;
    private String ice;
    private String size;
    private int count;
}
