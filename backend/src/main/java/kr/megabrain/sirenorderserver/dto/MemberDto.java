package kr.megabrain.sirenorderserver.dto;

import kr.megabrain.sirenorderserver.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
public class MemberDto {
    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String nickname;

    public static MemberDto from(Member member) {
        return MemberDto.builder()
                .username(member.getUsername())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .build();
    }
}
