package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.constant.OrderStatus;
import kr.megabrain.sirenorderserver.discord.service.WebHookService;
import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.dto.OrderHistoryDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.entity.Order;
import kr.megabrain.sirenorderserver.exception.OutOfStockException;
import kr.megabrain.sirenorderserver.jwt.TokenProvider;
import kr.megabrain.sirenorderserver.service.ItemService;
import kr.megabrain.sirenorderserver.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.BiConsumer;

@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final WebHookService webHookService;
    private final TokenProvider tokenProvider;

    @PostMapping("/order")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public @ResponseBody
    ResponseEntity newOrder(@Valid @RequestBody OrderDto orderDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Order order;
        try {
            order = orderService.order(orderDto, "");
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        JSONArray embeds = new JSONArray();
        JSONObject data = new JSONObject();
        data.put("title", "\uD83D\uDCE3 [주문 접수 안내 ]");
        data.put("description", authentication.getName() + "님의 소중한 주문이 접수되었습니다. \n\n" +
                "주문 일시 : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + "\n" +
                "주문 번호 : " + order.getId() + "\n" +
                "주문 내역 : " + order.getOrderItems().get(0).getItem().getItemName() + " x " + order.getOrderItems().get(0).getCount() +
                " " + order.getOrderItems().get(0).getIce() + " " + order.getOrderItems().get(0).getSize()
        );
        data.put("url", "http://shonn.megabrain.kr:9995/receipt");
        embeds.put(data);

        webHookService.send(embeds);
        return new ResponseEntity(order.getId(), HttpStatus.OK);
    }


    @GetMapping("/order")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity getAllOrders() {
        List<OrderHistoryDto> orderHistoryDtos = orderService.allOrder();
        return new ResponseEntity(orderHistoryDtos, HttpStatus.OK);
    }

    @GetMapping("/order/{orderId}/accept")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity orderAccept(@PathVariable("orderId") String orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 주문 수락
        try {
            orderService.setOrderStatus(orderId, OrderStatus.ACCEPT);
        } catch (OutOfStockException e) {
            return new ResponseEntity(e.getMessage() , HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            return new ResponseEntity("처리된 주문입니다.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity("없는 주문입니다.", HttpStatus.BAD_REQUEST);
        }
        JSONArray embeds = new JSONArray();
        JSONObject data = new JSONObject();
        data.put("title", "\uD83D\uDCE3 [주문 수락 안내 ]");
        data.put("description", authentication.getName() + "님의 소중한 주문이 수락되었습니다. \n\n" +
                "주문 번호 : " + orderId
        );
        embeds.put(data);

        webHookService.send(embeds);
        return new ResponseEntity("수락되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/order/{orderId}/cancel")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity orderCancel(@PathVariable("orderId") String orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 주문 수락
        try {
            orderService.setOrderStatus(orderId, OrderStatus.CANCEL);
        } catch (IllegalStateException e) {
            return new ResponseEntity("처리된 주문입니다.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity("없는 주문입니다.", HttpStatus.BAD_REQUEST);
        }
        JSONArray embeds = new JSONArray();
        JSONObject data = new JSONObject();
        data.put("title", "\uD83D\uDCE3 [주문 취소 안내 ]");
        data.put("description", authentication.getName() + "님의 소중한 주문이 취소되었습니다. \n\n" +
                "주문 번호 : " + orderId
        );
        embeds.put(data);

        webHookService.send(embeds);

        return new ResponseEntity("취소되었습니다.", HttpStatus.OK);
    }
}
