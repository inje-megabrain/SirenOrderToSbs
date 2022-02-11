package kr.megabrain.sirenorderserver.service;

import kr.megabrain.sirenorderserver.constant.Role;
import kr.megabrain.sirenorderserver.dto.MemberDto;
import kr.megabrain.sirenorderserver.entity.Member;
import kr.megabrain.sirenorderserver.repository.MemberRepository;
import kr.megabrain.sirenorderserver.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@Transactional  // DB 원복가능함
@RequiredArgsConstructor
public class MemberService  {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberDto singup(MemberDto memberDto) {
        if (memberRepository.findByUsername(memberDto.getUsername()) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Member member = Member.builder()
                .username(memberDto.getUsername())
                .nickname(memberDto.getNickname())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .role(Role.USER)
                .build();

        return MemberDto.from(memberRepository.save(member));
    }
}
