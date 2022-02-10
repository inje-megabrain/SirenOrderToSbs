package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.discord.service.WebHookService;
import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.dto.OrderHistoryDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.entity.Order;
import kr.megabrain.sirenorderserver.service.ItemService;
import kr.megabrain.sirenorderserver.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
    private final WebHookService webHookService;

    @PostMapping("/order")
    public @ResponseBody
    ResponseEntity newOrder(@Valid @RequestBody OrderDto orderDto) {

        Long orderId;
        try {
            orderId = orderService.order(orderDto, "");
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        webHookService.send(
                "[주문 접수 안내]\n" +
                "\n" +
                "주문해주셔서 감사합니다.\n" +
                "\n" +
                "고객님의 소중한 주문이 정상 접수되어, time분 내외로 도착할 예정입니다.\n" +
                "\n" +
                "- 주문 일시 : " + "time" +
                "- 주문 번호 : " +  orderId + " \n" +
                "- 상품명 : 돈친\n" +
                "- 주문 내역 : 까르보나라 x 1 외 1 건\n"
        );
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    @GetMapping("/order")
    public @ResponseBody
    ResponseEntity getAllOrders() {
        List<OrderHistoryDto> orderHistoryDtos = orderService.allOrder();
        return new ResponseEntity(orderHistoryDtos, HttpStatus.OK);
    }
}
