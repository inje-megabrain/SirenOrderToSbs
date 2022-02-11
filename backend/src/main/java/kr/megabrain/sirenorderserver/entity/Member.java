package kr.megabrain.sirenorderserver.entity;

import kr.megabrain.sirenorderserver.constant.Role;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String username;

    private String password;

    private String nickname;
    
    @Enumerated(EnumType.STRING)
    private Role role;

}
