package kr.megabrain.sirenorderserver.discord.service;

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

public class WebHookService {
    private  static Logger log = LoggerFactory.getLogger(WebHookService.class);

    @Value("${discord.webhookURL}")
    private  String url;

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
