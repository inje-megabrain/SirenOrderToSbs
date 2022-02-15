package kr.megabrain.sirenorderserver.discord.service;

import kr.megabrain.sirenorderserver.dto.MemberDto;
import kr.megabrain.sirenorderserver.dto.OrderDto;
import kr.megabrain.sirenorderserver.entity.Member;
import kr.megabrain.sirenorderserver.entity.Order;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class WebHookService {
    private  static Logger log = LoggerFactory.getLogger(WebHookService.class);

    @Value("${discord.webhookURL}")
    private  String url;

    public void sendOrderMessage(MemberDto memberDto, Order order) throws RuntimeException{
        JSONArray embeds = new JSONArray();
        JSONObject data = new JSONObject();
        data.put("title", "\uD83D\uDCE3 [주문 접수 안내 ]");
        data.put("description", memberDto.getNickname() + "님의 소중한 주문이 접수되었습니다. \n\n" +
                "주문 일시 : " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + "\n" +
                "주문 번호 : " + order.getId() + "\n" +
                "주문 내역 : " + order.getOrderItems().get(0).getItem().getItemName() + " x " + order.getOrderItems().get(0).getCount() +
                " " + order.getOrderItems().get(0).getIce() + " " + order.getOrderItems().get(0).getSize()
        );
        data.put("url", "http://shonn.megabrain.kr:9995/receipt");
        embeds.put(data);
        send(embeds);
    }

    public void sendOrderResultMessage(String result, String nickname, String orderId){
        JSONArray embeds = new JSONArray();
        JSONObject data = new JSONObject();
        data.put("title", "\uD83D\uDCE3 [주문 "+result+" 안내 ]");
        data.put("description", nickname + "님의 소중한 주문이 "+result+"되었습니다. \n\n" +
                "주문 번호 : " + orderId
        );
        embeds.put(data);
        send(embeds);
    }

    public void send(JSONArray embeds){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject body = new JSONObject();

        body.put("embeds", embeds);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
        restTemplate.postForObject(url, entity, String.class);

    }
    private String quote(String string) {
        return "\"" + string + "\"";
    }

}
