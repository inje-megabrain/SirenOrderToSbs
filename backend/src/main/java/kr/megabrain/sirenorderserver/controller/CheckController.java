package kr.megabrain.sirenorderserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
public class CheckController {

    @GetMapping("/ping")
    public String ping(){
        return "pong";
    }
}
