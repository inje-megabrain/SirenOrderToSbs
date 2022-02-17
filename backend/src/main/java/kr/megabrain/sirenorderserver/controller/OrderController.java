package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.constant.OrderStatus;
import kr.megabrain.sirenorderserver.discord.service.WebHookService;
import kr.megabrain.sirenorderserver.dto.MemberDto;
import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.dto.OrderHistoryDto;
import kr.megabrain.sirenorderserver.entity.Item;
import kr.megabrain.sirenorderserver.entity.Order;
import kr.megabrain.sirenorderserver.exception.OutOfStockException;
import kr.megabrain.sirenorderserver.jwt.TokenProvider;
import kr.megabrain.sirenorderserver.service.ItemService;
import kr.megabrain.sirenorderserver.service.MemberService;
import kr.megabrain.sirenorderserver.service.OrderService;
import kr.megabrain.sirenorderserver.util.SecurityUtil;
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
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;
    private final WebHookService webHookService;
    private final TokenProvider tokenProvider;
    private final MemberService memberService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public @ResponseBody
    ResponseEntity newOrder(@Valid @RequestBody OrderDto orderDto) {
        String username = SecurityUtil.getCurrentUsername().get();
        MemberDto memberDto = memberService.getMemberInfoByUsername(username);

        Order order;
        try {
            order = orderService.order(orderDto, memberDto.getUsername());

            webHookService.sendOrderMessage(memberDto, order);

        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity(order.getId(), HttpStatus.OK);
    }


    @GetMapping("")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity getAllOrders() {
        List<OrderHistoryDto> orderHistoryDtos = orderService.allOrderHitsory(); // controller <-> service <-> repository(단방향)
        return new ResponseEntity(orderHistoryDtos, HttpStatus.OK);
    }

    @GetMapping("/{orderId}/accept")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity orderAccept(@PathVariable("orderId") String orderId) {
        String username = SecurityUtil.getCurrentUsername().get();
        MemberDto member = memberService.getMemberInfoByUsername(username);

        // 주문 수락
        try {
            orderService.setOrderStatus(orderId, OrderStatus.ACCEPT);

            webHookService.sendOrderResultMessage("수락", member.getNickname(), orderId);
        } catch (OutOfStockException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            return new ResponseEntity("처리된 주문입니다.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity("없는 주문입니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("수락되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/{orderId}/cancel")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public @ResponseBody
    ResponseEntity orderCancel(@PathVariable("orderId") String orderId) {
        String username = SecurityUtil.getCurrentUsername().get();
        MemberDto member = memberService.getMemberInfoByUsername(username);

        // 주문 수락
        try {
            orderService.setOrderStatus(orderId, OrderStatus.CANCEL);
            webHookService.sendOrderResultMessage("취소", member.getNickname(), orderId);
        } catch (IllegalStateException e) {
            return new ResponseEntity("처리된 주문입니다.", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity("없는 주문입니다.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("취소되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/myorder")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public @ResponseBody
    ResponseEntity getMemberOrder() {
        String username = SecurityUtil.getCurrentUsername().get();
        List<OrderHistoryDto> orderHistoryDtos = orderService.memberAllOrderHitory(username); // controller <-> service <-> repository(단방향)
        return new ResponseEntity(orderHistoryDtos, HttpStatus.OK);
    }
}
