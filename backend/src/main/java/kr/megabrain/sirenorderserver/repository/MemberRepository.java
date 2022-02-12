package kr.megabrain.sirenorderserver.repository;

import kr.megabrain.sirenorderserver.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    public Member findByUsername(String username);

}
