package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.discord.service.WebHookService;
import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.dto.OrderHistoryDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.entity.Order;
import kr.megabrain.sirenorderserver.service.ItemService;
import kr.megabrain.sirenorderserver.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final WebHookService webHookService;

    @PostMapping("/order")
    public @ResponseBody
    ResponseEntity newOrder(@Valid @RequestBody OrderDto orderDto) {

        Order order;
        try {
            order = orderService.order(orderDto, "");
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        JSONArray embeds = new JSONArray();
        JSONObject data = new JSONObject();
        data.put("title", "\uD83D\uDCE3 [주문 접수 안내 ]");
        data.put("description", "name" + "님의 소중한 주문이 접수되었습니다. \n\n" +
                "주문 일시 : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + "\n" +
                        "주문 번호 : " + order.getId() + "\n" +
                        "주문 내역 : " + order.getOrderItems().get(0).getItem().getItemName() + " x " + order.getOrderItems().get(0).getCount() +
                        " " + order.getOrderItems().get(0).getIce() + " " + order.getOrderItems().get(0).getSize()
        );
        data.put("url", "http://shonn.megabrain.kr:9995/receipt");
        embeds.put(data);

        webHookService.send(embeds);
        return new ResponseEntity<Long>(order.getId() , HttpStatus.OK);
    }

    @GetMapping("/order")
    public @ResponseBody
    ResponseEntity getAllOrders() {
        List<OrderHistoryDto> orderHistoryDtos = orderService.allOrder();
        return new ResponseEntity(orderHistoryDtos, HttpStatus.OK);
    }
}
