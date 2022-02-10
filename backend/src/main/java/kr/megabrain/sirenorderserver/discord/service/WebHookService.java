package kr.megabrain.sirenorderserver.discord.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

public class WebHookService {

    @Value("${discord.webhookURL}")
    private  String url;

    public void send(String data){
        RestTemplate restTemplate = new RestTemplate();

        Map<String,Object> request = new HashMap<String,Object>();
        request.put("content", data);

        HttpEntity<Map<String,Object>> entity = new HttpEntity<Map<String,Object>>(request);
        // Webhook URL

        restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    }
}
