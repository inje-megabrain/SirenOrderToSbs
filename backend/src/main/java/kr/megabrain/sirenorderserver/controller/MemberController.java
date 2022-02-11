package kr.megabrain.sirenorderserver.controller;

import kr.megabrain.sirenorderserver.dto.MemberDto;
import kr.megabrain.sirenorderserver.entity.Member;
import kr.megabrain.sirenorderserver.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberDto> signup(@Valid @RequestBody MemberDto memberDto) {
        try {
            MemberDto member = memberService.singup(memberDto);
            return new ResponseEntity(memberDto.getUsername() + " 가입완료", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity getMyinfo(Authentication authentication) {
        try {
            return new ResponseEntity(authentication.getName(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Error", HttpStatus.BAD_REQUEST);
        }
    }
}
