package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.service.ItemService;
import kr.megabrain.sirenorderserver.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.function.BiConsumer;

@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final ItemService itemService;


    @PostMapping("/order")
    public ResponseEntity newOrder(@Valid @RequestBody OrderDto orderDto) {

        Long orderId;
        try {
            orderId = orderService.order(orderDto, "");
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    @GetMapping("/order")
    public ResponseEntity getAllItem() {

        List<Item> items = itemService.allItem();

        return new ResponseEntity(items, HttpStatus.OK);
    }
}
